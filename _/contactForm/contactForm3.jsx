import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import * as THREE from 'three';

function App() {
  const p5Ref = useRef(null);
  const threeRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          // Form is valid - show success message
          alert('Thank you for your message! We\'ll get back to you soon.');
          setFormData({ name: '', email: '', message: '' });
          form.classList.remove('was-validated');
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // p5.js sketch - interactive particles that respond to mouse
    const sketch = (s) => {
      let particles = [];
      
      s.setup = () => {
        s.createCanvas(400, 300);
        s.background(15, 25, 35);
        
        // Create initial particles
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
        s.background(15, 25, 35, 50);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          let p = particles[i];
          
          // Move particles
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Wrap around edges
          if (p.x > s.width) p.x = 0;
          if (p.x < 0) p.x = s.width;
          if (p.y > s.height) p.y = 0;
          if (p.y < 0) p.y = s.height;
          
          // Mouse interaction
          let d = s.dist(s.mouseX, s.mouseY, p.x, p.y);
          if (d < 100) {
            let angle = s.atan2(s.mouseY - p.y, s.mouseX - p.x);
            p.x -= s.cos(angle) * 2;
            p.y -= s.sin(angle) * 2;
          }
          
          // Draw particle
          s.noStroke();
          s.fill(p.color);
          s.circle(p.x, p.y, p.size);
        }
      };
    };
    
    const myp5 = new p5(sketch, p5Ref.current);

    return () => {
      myp5.remove();
    };
  }, []);

  useEffect(() => {
    // Three.js scene - floating geometric shapes
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f);
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 300);
    threeRef.current.appendChild(renderer.domElement);

    // Create multiple shapes
    const geometries = [
      new THREE.ConeGeometry(0.8, 1.6, 5),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100)
    ];
    
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff5757, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0x4cdb79, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0x57a0ff, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0xffcc4d, shininess: 100 })
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

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional lights
    const light1 = new THREE.PointLight(0xff5733, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x3357ff, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate each shape with different rotations
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1) * 0.5;
        shape.rotation.y += 0.01 * (index + 1) * 0.7;
        
        // Add subtle floating motion
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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-5 fw-bold text-gradient">Contact Us</h1>
          <p className="lead">Get in touch with our team</p>
        </div>
      </div>
      
      <div className="row">
        {/* Left: Form */}
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 p-4 glass-effect">
            <h3 className="card-title text-center mb-4">Send us a Message</h3>
            <form className="needs-validation" noValidate>
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
        </div>

        {/* Right: Visuals */}
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-4 text-center">
            <h4>Interactive Particles</h4>
            <div ref={p5Ref} className="rounded shadow"></div>
          </div>
          <div className="text-center">
            <h4>Floating Shapes</h4>
            <div ref={threeRef} className="rounded shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;