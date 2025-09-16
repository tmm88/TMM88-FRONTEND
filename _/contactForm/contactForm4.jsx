import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import * as THREE from 'three';

/**
 * Custom P5.js sketch component
 */
function P5Sketch() {
  const p5Ref = useRef(null);

  useEffect(() => {
    const sketch = (s) => {
      let particles = [];
      
      s.setup = () => {
        s.createCanvas(400, 300);
        
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: s.random(s.width),
            y: s.random(s.height),
            size: s.random(5, 15),
            speedX: s.random(-1, 1),
            speedY: s.random(-1, 1),
            color: s.color(s.random(150, 255), s.random(100, 200), s.random(150, 255))
          });
        }
      };
      
      s.draw = () => {
        s.background('rgba(15, 25, 35, 0.2)');
        
        for (let i = 0; i < particles.length; i++) {
          let p = particles[i];
          
          p.x += p.speedX;
          p.y += p.speedY;
          
          if (p.x > s.width) p.x = 0;
          if (p.x < 0) p.x = s.width;
          if (p.y > s.height) p.y = 0;
          if (p.y < 0) p.y = s.height;
          
          let d = s.dist(s.mouseX, s.mouseY, p.x, p.y);
          if (d < 100) {
            let angle = s.atan2(s.mouseY - p.y, s.mouseX - p.x);
            p.x -= s.cos(angle) * 2;
            p.y -= s.sin(angle) * 2;
          }
          
          s.noStroke();
          s.fill(p.color);
          s.circle(p.x, p.y, p.size);
        }
      };
    };
    
    const myp5 = new p5(sketch, p5Ref.current);
    return () => myp5.remove();
  }, []);

  return <div ref={p5Ref} className="rounded shadow canvas-container"></div>;
}

---

### Three.js Component

```jsx
/**
 * Custom Three.js scene component
 */
function ThreeScene() {
  const threeRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 300);
    threeRef.current.appendChild(renderer.domElement);

    const geometries = [
      new THREE.ConeGeometry(0.8, 1.6, 5),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100)
    ];
    
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x57a0ff, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0x4cdb79, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0xffcc4d, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0xff5757, shininess: 100 })
    ];
    
    const shapes = [];
    
    for (let i = 0; i < 4; i++) {
      const shape = new THREE.Mesh(geometries[i], materials[i]);
      shape.position.x = (i % 2 === 0 ? -1.5 : 1.5);
      shape.position.y = (i < 2 ? 0.8 : -0.8);
      shape.position.z = 0;
      scene.add(shape);
      shapes.push(shape);
    }
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const light1 = new THREE.PointLight(0x57a0ff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xffcc4d, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1) * 0.5;
        shape.rotation.y += 0.01 * (index + 1) * 0.7;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      threeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={threeRef} className="rounded shadow canvas-container"></div>;
}

---

### Contact Form Component

```jsx
/**
 * Reusable contact form component
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity()) {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setValidated(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 p-4 contact-card">
      <h3 className="card-title text-center mb-4">Send us a Message</h3>
      <form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          <div className="invalid-feedback">Please enter your name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea 
            className="form-control" 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <div className="invalid-feedback">Please enter your message.</div>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Send Message</button>
      </form>
    </div>
  );
}

---

### Main App Component and CSS

```jsx
function App() {
  return (
    <div className="app-container">
      <style jsx>{`
        /* Custom CSS for the App */
        :root {
          --primary-color: #57a0ff;
          --secondary-color: #4cdb79;
          --accent-color: #ffcc4d;
          --dark-bg: #0a192f;
          --dark-card-bg: rgba(24, 39, 61, 0.75);
          --text-light: #e0e0e0;
          --text-secondary: #a8b2d1;
        }

        .app-container {
          min-height: 100vh;
          background-image: linear-gradient(
            45deg,
            var(--dark-bg) 0%,
            rgba(15, 25, 35, 0.8) 50%,
            var(--dark-bg) 100%
          );
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: var(--text-light);
        }
        
        body {
          background: var(--dark-bg);
          overflow-x: hidden;
        }

        .text-gradient {
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .contact-card {
          background: var(--dark-card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .form-control {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-light);
          transition: all 0.3s ease-in-out;
        }

        .form-control:focus {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.25rem rgba(87, 160, 255, 0.25);
          color: var(--text-light);
        }

        .form-control:valid {
          border-color: var(--secondary-color);
        }

        .form-control:invalid {
          border-color: #dc3545;
        }

        .btn-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          transition: all 0.3s ease-in-out;
        }

        .btn-primary:hover {
          background-color: #4a8ee0;
          border-color: #4a8ee0;
          transform: translateY(-2px);
        }

        .btn-primary:active {
          background-color: #3b74bf;
          border-color: #3b74bf;
          transform: translateY(0);
        }

        .canvas-container {
          background-color: transparent;
          width: 400px;
          height: 300px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease-in-out;
        }

        .canvas-container:hover {
          transform: scale(1.03);
        }
        
        h1, h4 {
          color: var(--text-light);
        }
        .lead, .text-secondary {
          color: var(--text-secondary) !important;
        }
      `}</style>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h1 className="display-5 fw-bold text-gradient">Contact Us</h1>
            <p className="lead text-secondary">Get in touch with our team</p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-6 mb-4">
            <ContactForm />
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
            <div className="mb-4 text-center">
              <h4 className="text-secondary">Interactive Particles</h4>
              <P5Sketch />
            </div>
            <div className="text-center">
              <h4 className="text-secondary">Floating Shapes</h4>
              <ThreeScene />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;