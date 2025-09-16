import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import * as THREE from 'three';

function App() {
  const p5Ref = useRef(null);
  const threeRef = useRef(null);

  useEffect(() => {
    // Bootstrap validation
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
    // p5.js sketch (variation with colorful rectangles)
    const sketch = (s) => {
      s.setup = () => {
        s.createCanvas(400, 400);
        s.background(20);
      };
      s.draw = () => {
        s.noStroke();
        s.fill(s.random(255), s.random(255), s.random(255), 80);
        s.rect(s.mouseX, s.mouseY, 40, 40);
      };
    };
    const myp5 = new p5(sketch, p5Ref.current);

    return () => {
      myp5.remove();
    };
  }, []);

  useEffect(() => {
    // Three.js scene (pyramid instead of cube)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    threeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(1, 2, 4); // pyramid shape
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733, shininess: 100 });
    const pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    // Add light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      pyramid.rotation.x += 0.01;
      pyramid.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      threeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left: Form */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="card-title text-center mb-3">Get in Touch</h3>
            <form action="/submit" method="POST" className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" required />
                <div className="invalid-feedback">Please enter your name.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" required />
                <div className="invalid-feedback">Please enter a valid email.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                <div className="invalid-feedback">Please enter your message.</div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send</button>
            </form>
          </div>
        </div>

        {/* Right: Visuals */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          <div ref={p5Ref} style={{ marginTop: '20px', border: '1px solid #ccc' }}></div>
          <div ref={threeRef} style={{ marginTop: '20px', border: '1px solid #ccc' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
