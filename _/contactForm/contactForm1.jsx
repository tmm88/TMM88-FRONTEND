import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import * as THREE from 'three';

function App() {
  const p5Ref = useRef(null);
  const threeRef = useRef(null);

  useEffect(() => {
    // Bootstrap form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, []);

  useEffect(() => {
    // p5.js sketch
    const sketch = (s) => {
      s.setup = () => {
        s.createCanvas(400, 400);
        s.background(220);
      };
      s.draw = () => {
        s.fill(255, 0, 0, 50);
        s.ellipse(s.mouseX, s.mouseY, 50, 50);
      };
    };
    new p5(sketch, p5Ref.current);

    // Cleanup on unmount
    return () => {
      p5Ref.current.remove();
    };
  }, []);

  useEffect(() => {
    // Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    threeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      threeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form action="/submit" method="POST" className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required />
          <div className="invalid-feedback">
            Please enter your name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" name="message" rows="5" placeholder="Your message" required></textarea>
          <div className="invalid-feedback">
            Please enter your message.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div ref={p5Ref} style={{ marginTop: '20px', border: '1px solid #ccc' }}></div>
      <div ref={threeRef} style={{ marginTop: '20px', border: '1px solid #ccc' }}></div>
    </div>
  );
}

export default App;