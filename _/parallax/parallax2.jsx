import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ParallaxMenu.css"; // We'll extract CSS here

export default function ParallaxMenu() {
  useEffect(() => {
    // Smooth scrolling for nav links
    const links = document.querySelectorAll(".nav-link");
    links.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Dynamic navbar background on scroll
    const onScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      links.forEach((anchor) => {
        anchor.replaceWith(anchor.cloneNode(true));
      });
    };
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Parallax Menu
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Parallax Sections */}
      <section id="home" className="parallax-section home">
        <div className="parallax-content">
          <h1 className="display-4">Welcome Home</h1>
          <p className="lead">Discover the beauty of parallax scrolling.</p>
        </div>
      </section>
      <section id="about" className="parallax-section about">
        <div className="parallax-content">
          <h1 className="display-4">About Us</h1>
          <p className="lead">Learn more about our mission and vision.</p>
        </div>
      </section>
      <section id="services" className="parallax-section services">
        <div className="parallax-content">
          <h1 className="display-4">Our Services</h1>
          <p className="lead">Explore what we offer to enhance your experience.</p>
        </div>
      </section>
      <section id="contact" className="parallax-section contact">
        <div className="parallax-content">
          <h1 className="display-4">Contact Us</h1>
          <p className="lead">Get in touch for more information.</p>
        </div>
      </section>
    </>
  );
}
