import React, { useEffect, useRef, useState } from "react";

export default function ParallaxSlider() {
  const sliderRef = useRef(null);
  const slidesRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [width, setWidth] = useState(0);

  // initialize width on mount
  useEffect(() => {
    if (sliderRef.current) setWidth(sliderRef.current.clientWidth);
    const handleResize = () => setWidth(sliderRef.current.clientWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      title: "Explore",
      text: "Parallax slider menu with layered depth. Native HTML, CSS and vanilla JS — lightweight and accessible.",
      menu: ["Home", "Work", "About", "Contact"],
      bg: "linear-gradient(120deg,#232526,#414345)",
      layers: [
        { depth: 0.12, style: { background: "radial-gradient(circle at 30% 30%, rgba(255,107,107,0.9), rgba(255,107,107,0.2) 30%, transparent 50%)" } },
        { depth: 0.28, style: { left: "-6%", top: "10%", width: "50%", height: "80%", background: "linear-gradient(180deg, rgba(60,72,255,0.55), rgba(15,219,147,0.14))", opacity: ".14", filter: "blur(26px)" } }
      ]
    },
    {
      title: "Work",
      text: "Showcase projects, galleries and interactive demos. Each menu entry can trigger navigation or dynamic content.",
      menu: ["Portfolio", "Case Studies", "Downloads"],
      bg: "linear-gradient(120deg,#0f2027,#2c5364)",
      layers: [
        { depth: 0.14, style: { background: "radial-gradient(circle at 70% 40%, rgba(0,200,255,0.9), transparent 45%)", opacity: ".12", filter: "blur(34px)", right: "-20%", top: "-10%", width: "80%", height: "120%" } }
      ]
    },
    {
      title: "About",
      text: "Lightweight, accessible and keyboard-friendly: built with progressive enhancement in mind. Easily adaptable to SPA frameworks.",
      menu: ["Team", "History"],
      bg: "linear-gradient(120deg,#42275a,#734b6d)",
      layers: [
        { depth: 0.2, style: { background: "conic-gradient(from 120deg at 40% 40%, rgba(255,255,255,0.06), rgba(255,255,255,0.0))", opacity: ".08", filter: "blur(28px)", right: "-10%", top: "6%", width: "70%", height: "110%" } }
      ]
    },
    {
      title: "Contact",
      text: "Connect with forms, social links or by launching deep navigation inside your app. The menu can be used as a navigation hub.",
      menu: ["Email", "Social"],
      bg: "linear-gradient(120deg,#134E5E,#71B280)",
      layers: [
        { depth: 0.18, style: { background: "radial-gradient(circle at 10% 80%, rgba(255,255,255,0.06), transparent 40%)", opacity: ".08", filter: "blur(20px)", left: "-10%", top: 0, width: "70%", height: "110%" } }
      ]
    }
  ];

  const goTo = (n) => {
    if (n < 0) n = slides.length - 1;
    if (n > slides.length - 1) n = 0;
    setIdx(n);
  };

  // keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goTo(idx - 1);
      if (e.key === "ArrowRight") goTo(idx + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [idx]);

  // mouse parallax effect
  const handleMouseMove = (e) => {
    const slider = sliderRef.current;
    const activeSlide = slidesRef.current.children[idx];
    if (!slider || !activeSlide) return;
    const r = slider.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    activeSlide.querySelectorAll(".layer").forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth) || 0.1;
      const moveX = -px * depth * 30;
      const moveY = -py * depth * 28;
      layer.style.transform = `translate3d(${moveX}px,${moveY}px,0) scale(${1 + depth * 0.02})`;
    });
  };

  const handleMouseLeave = () => {
    Array.from(slidesRef.current.children).forEach((s) =>
      s.querySelectorAll(".layer").forEach((l) => (l.style.transform = "translate3d(0,0,0)"))
    );
  };

  return (
    <div className="wrap">
      <div className="slider" ref={sliderRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="topbar">
          <div className="logo">ParallaxMenu</div>
          <div className="subtitle">reactjs demo</div>
        </div>

        <div className="arrow left" onClick={() => goTo(idx - 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        <div className="arrow right" onClick={() => goTo(idx + 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>

        <div className="slides" ref={slidesRef} style={{ transform: `translateX(${-idx * 100}%)`, transition: "transform 700ms cubic-bezier(.22,.9,.33,1)" }}>
          {slides.map((s, i) => (
            <section key={i} className="slide" data-index={i} style={{ background: s.bg }}>
              {s.layers.map((l, j) => (
                <div key={j} className="layer" data-depth={l.depth}>
                  <div className="shape" style={l.style}></div>
                </div>
              ))}
              <div className="overlay"></div>
              <div className="content">
                <h1>{s.title}</h1>
                <p>{s.text}</p>
                <div className="menu">
                  {s.menu.map((m, k) => (
                    <button key={k} onClick={() => goTo(i)}>{m}</button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="controls">
          {slides.map((_, i) => (
            <div key={i} className={`dot ${i === idx ? "active" : ""}`} onClick={() => goTo(i)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
