"use client";
import React from 'react';

export default function NavBar() {
  const scrollToSection = (sectionId: string) => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        };
  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => scrollToSection('mission')} className="nav-link">Our Mission</button>
        <button onClick={() => scrollToSection('about')} className="nav-link">About us</button>
        <button onClick={() => scrollToSection('join')} className="nav-link">Join us</button>
      </div>
    </nav>
  );
}
