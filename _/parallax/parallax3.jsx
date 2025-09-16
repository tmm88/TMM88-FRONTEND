import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ParallaxBootstrapMenu.css"; // external stylesheet

const ParallaxBootstrapMenu = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-solid");
      } else {
        navbar.classList.remove("navbar-solid");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const links = document.querySelectorAll("a.nav-link");
    links.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: "smooth",
            });
          }
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      links.forEach((anchor) => {
        anchor.replaceWith(anchor.cloneNode(true));
      });
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            ParallaxNav
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-4">Dynamic Parallax Menu</h1>
          <p className="lead mb-4">
            A modern Bootstrap navigation with smooth parallax effects
          </p>
          <button className="btn btn-gradient">Explore More</button>
        </div>
      </section>

      {/* Content Section */}
      <section id="about" className="section content-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <h2 className="mb-4">Sleek & Modern Design</h2>
              <p className="lead">
                This parallax menu uses native Bootstrap 5 with custom CSS for
                smooth scrolling effects. The navbar changes style on scroll and
                the background images create depth with parallax effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section id="services" className="parallax">
        <div className="container text-center">
          <h2 className="display-4 fw-bold">Immersive Experience</h2>
          <p className="lead">Scroll to see the parallax effect in action</p>
        </div>
      </section>

      {/* Content Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Fully Responsive</h3>
              <p>
                This menu works perfectly on all device sizes, from mobile to
                desktop. The navbar collapses into a hamburger menu on smaller
                screens.
              </p>
            </div>
            <div className="col-md-6">
              <h3>Dynamic Effects</h3>
              <p>
                As you scroll, the navbar changes its appearance smoothly. The
                parallax backgrounds create a sense of depth and immersion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer text-center">
        <div className="container">
          <p className="mb-4">
            © 2023 Parallax Bootstrap Menu. All rights reserved.
          </p>
          <div className="d-flex justify-content-center">
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ParallaxBootstrapMenu;