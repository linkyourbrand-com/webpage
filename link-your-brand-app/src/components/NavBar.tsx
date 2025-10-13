"use client";
import React from 'react';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/explore" className="nav-link">Explore</a>
        <a href="/mission" className="nav-link">Our Mission</a>
        <a href="/about" className="nav-link">About us</a>
        <a href="/join" className="nav-link">Join us</a>
        <a href="/contact" className="nav-link">Support</a>
      </div>
    </nav>
  );
}
