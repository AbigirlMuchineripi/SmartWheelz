import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./index.css";
import Chatbot from "./Chatbot/Chatbot";
import carStartSound from "./porsche-sound.mp3";

// Car Data
const cars = [
  {
    name: "Porsche 911 Carrera",
    description: "High-performance sports car with timeless design.",
    image: "/images/porsche1.jpg",
    price: "$99,200",
  },
  {
    name: "BMW 540ix Series",
    description: "High-performance compact executive car with sporty design.",
    image: "/images/bmw-540ix-series.jpg",
    price: "$45,450",
  },
  {
    name: "Suzuka Grey Metallic R8 Audi",
    description: "Electric, luxury and elegant two door sports car.",
    image: "/images/audi suzuki.jpg",
    price: "$55,500",
  },
  {
    name: "Tesla Model S3 2025 Concept",
    description: "Electric luxury sedan.",
    image: "/images/Tesla-Model-S 3.jpg",
    price: "$89,990",
  },
  {
    name: "Toyota Camry",
    description: "Comfortable Midsize Sedan",
    image: "/images/toyotacamry.jpg",
    price: "$25,000",
  },
  {
    name: "Chevrolet Silverado",
    description: "Robust, capable and spacious full-size pickup truck.",
    image: "/images/Chevrolet_Silverado.png",
    price: "$48,200",
  },
  {
    name: "Ford Mustang",
    description:
      "Elevated crossover SUV with exhilarating electric performance.",
    image: "/images/Ford Mustang.jpg",
    price: "$49,900",
  },
  {
    name: "Honda CR-Z Hybrid",
    description:
      "Versatile compact SUV with ample cargo space and reliability.",
    image: "/images/Honda cr-z sports-hybrid.jpg",
    price: "$32,950",
  },
  {
    name: "Hyundai Santa Fe",
    description:
      "Spacious and comfortable midsize SUV with advanced safety features.",
    image: "/images/hyundai sante-fe.jpg",
    price: "$34,650",
  },
  {
    name: "Nissan GT-R Debut",
    description: "Electric and luxurious sports car",
    image: "/images/nissan-gt-r-debut.jpg",
    price: "$34,650",
  },
  {
    name: "M-Benz C-Class",
    description: "Luxurious and stylish compact executive car.",
    image: "/images/Mbenz c.jpg",
    price: "$41,600",
  },
  {
    name: "Tesla Model S",
    description: "Electric Performance Sedan",
    image: "/images/tesla-model S.jpg",
    price: "$70,000",
  },
];

// CarListing Component
function CarListing({ car, isHighlighted }) {
  return (
    <div className={`car-listing ${isHighlighted ? "highlighted" : ""}`}>
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>{car.description}</p>
      <h4 className="car-price">{car.price}</h4>
      <button>Buy</button>
    </div>
  );
}

CarListing.propTypes = {
  car: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  isHighlighted: PropTypes.bool.isRequired,
};

// Sponsors Component
function Sponsors() {
  const sponsors = [
    { name: "Tesla", image: "/images/tesla.jpg" },
    { name: "Car Magazine", image: "/images/audi logo.webp" },
  ];

  return (
    <div className="sponsors">
      <h2>Sponsored By</h2>
      <div className="sponsor-logos">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor">
            <img src={sponsor.image} alt={sponsor.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Render CarListings in App Component
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const audioRef = useRef(null);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const filterCars = useCallback(() => {
    let searchTermLowerCase = searchTerm.toLowerCase().trim();
    let priceFilterValue = priceFilter.trim();

    const filtered = cars.filter((car) => {
      const matchesName = car.name.toLowerCase().includes(searchTermLowerCase);

      let matchesPrice = true;
      if (priceFilterValue) {
        const carPrice = parseInt(car.price.replace(/[^0-9]/g, ""), 10);
        const filterPrice = parseInt(priceFilterValue.replace(/[^0-9]/g, ""), 10);

        if (!isNaN(filterPrice)) {
          matchesPrice = carPrice === filterPrice;
        } else {
          matchesPrice = false;
        }
      }
      return matchesName || matchesPrice;
    });

    setFilteredCars(filtered);

    if (filtered.length === 0) {
      alert("No cars found");
    }
  }, [searchTerm, priceFilter]);

  useEffect(() => {
    filterCars();
  }, [searchTerm, priceFilter, filterCars]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });

      const timeout = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>
          Smart Wh<span className="wheel">e</span>
          <span className="wheel1">e</span>lz
        </h1>
        <div className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
      {menuOpen && (
        <div className="menu" ref={menuRef}>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contacts">Contacts</a>
            </li>
            <li>
              <a href="#address">Address</a>
            </li>
          </ul>
        </div>
      )}
      <div className="welcome">
        <h2>Embrace unparalleled sophistication and elevate your driving experience today with our exclusive lineup of luxury cars, now offering complementary insurance.</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by car name"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <input
          type="text"
          placeholder="Search by price"
          value={priceFilter}
          onChange={handlePriceChange}
        />
      </div>
      <hr className="horizontal-line" />
      <div className="car-listing-container">
        {filteredCars.map((car) => (
          <li key={car.name}>
            <CarListing
              car={car}
              isHighlighted={
                car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (!isNaN(parseInt(priceFilter)) &&
                  parseInt(car.price.replace(/[^0-9]/g, ""), 10) ===
                    parseInt(priceFilter.replace(/[^0-9]/g, ""), 10))
              }
            />
          </li>
        ))}
      </div>
      <Chatbot />
      <audio ref={audioRef} src={carStartSound} preload="auto" />
      <Sponsors />
      <br />
      <hr id="line" />
      <footer>
        <section id="about">
          <h5>About Us</h5>
          <p className="footer-message">
            Smart Wheels has 10 years of experience in marketing and selling
            latest and luxurious cars. Purchase your dream car with us and enjoy
            free comprehensive car insurance for the first 3 months.
          </p>
        </section>
        <section id="contacts">
          <h5>Contacts</h5>
          <p className="footer-message">+263 776 076 777.</p>
        </section>
        <section id="address">
          <h5>Address</h5>
          <p className="footer-message">
            Number 4 Llama St, Belmont, Bulawayo, Zimbabwe
          </p>
        </section>
        <p className="rights">All Rights Reserved</p>
        <p className="x-link">
          <a
            href="https://x.com/AbbyMuchinexy"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered By Abby
          </a>
        </p>
      </footer>
    </div>
  );
}
