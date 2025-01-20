import React, { useState } from "react";

const Navbar = () => {
  const menuItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Ideas", href: "#ideas" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ];

  // State for active menu
  const [active, setActive] = useState("#ideas");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#E9662E] shadow-lg transition-all duration-300">
      <div className="w-full max-w-[1080px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#">
            <img
              src="/suitmedia-logo.png" // Replace with the path to your logo
              alt="Suitmedia Logo"
              className="h-20 w-20 object-contain" // Adjust the size of your logo
            />
          </a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776; {/* Hamburger Icon */}
        </button>

        {/* Menu */}
        <div
          className={`lg:flex lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block w-full absolute top-full left-0 bg-[#E9662E] lg:static lg:w-auto lg:flex-row lg:bg-transparent transition-all duration-300 ease-in-out`}
        >
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)} // Update active state on click
              className={`relative text-white text-lg font-medium transition duration-300 ease-in-out ${
                active === item.href
                  ? "text-white after:w-full after:bg-white"
                  : "text-white/70 hover:text-white after:w-0 after:bg-transparent"
              } after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:transition-all after:duration-300 hover:after:w-full py-3 px-5 block`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
