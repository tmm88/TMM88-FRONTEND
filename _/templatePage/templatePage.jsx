import React from 'react';
import ReactDOM from 'react-dom/client';

const NavBar = () => {
  const navItems = [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' },
    { id: 'item4', label: 'Item 4' },
    { id: 'item5', label: 'Item 5' },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4">
        {navItems.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-white font-bold hover:text-gray-300 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Content = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h1 className="text-3xl text-gray-800 text-center mb-4">Welcome to My Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Here we go with some exciting content!</p>
        <p>This is not rock and roll or death, but a fresh start to something amazing.</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8 w-full">
      <p>Here we go - Footer &copy; 2025</p>
    </footer>
  );
};

const App = () => {
  return (
    <div>
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
