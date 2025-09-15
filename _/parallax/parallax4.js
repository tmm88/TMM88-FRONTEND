import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParallaxMenu.css"; // external stylesheet

const ParallaxMenu = () => {
  useEffect(() => {
    const menu = document.querySelector(".parallax-menu");
    const scrollTrigger = 50;

    const handleScroll = () => {
      if (window.scrollY > scrollTrigger) {
        menu.classList.add("bg-dark", "shadow-sm");
      } else {
        menu.classList.remove("bg-dark", "shadow-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top parallax-menu">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">Parallax Menu</a>
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
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Parallax Section 1 */}
      <div
        id="home"
        className="parallax-section"
        style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=1')" }}
      >
        <h1>Welcome to the Parallax World</h1>
      </div>

      {/* Content */}
      <div className="content">
        <h2>Section 1</h2>
        <p>
          This is some regular content. Scroll down to see the effect! This is
          some regular content. Scroll down to see the effect!
        </p>
      </div>

      {/* Parallax Section 2 */}
      <div
        id="about"
        className="parallax-section"
        style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=2')" }}
      >
        <h1>Another great view!</h1>
      </div>

      <div className="content">
        <h2>Section 2</h2>
        <p>
          More content to create a scrollable page. The parallax effect works
          best with large images and plenty of content.
        </p>
      </div>

      {/* Parallax Section 3 */}
      <div
        id="services"
        className="parallax-section"
        style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=3')" }}
      >
        <h1>The Final Section</h1>
      </div>

      <div className="content">
        <h2>Section 3</h2>
        <p>The end of our journey! The end of our journey! The end of our journey!</p>
      </div>

      {/* Footer placeholder */}
      <div id="contact" className="content text-center">
        <h2>Contact</h2>
        <p>Get in touch with us for more information.</p>
      </div>
    </>
  );
};

export default ParallaxMenu;