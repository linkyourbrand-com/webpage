"use client";
import React from 'react';
import ClientLandingPage from '@/app/clientLanding/page';
import ManageEvntsDropdown from './userEvents/ManageEvntsDropdown';
import ProfileButton from './ProfileButton';
import Link from 'next/link';


import Link from 'next/link';

export default function NavBar({ isLoggedIn = true }: { isLoggedIn?: boolean }) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //issue the navbar is displayed twice
  //section removed.
  /*<div className="nav-links">
        <button onClick={() => scrollToSection('mission')} className="nav-link">Our Mission</button>
        <button onClick={() => scrollToSection('about')} className="nav-link">About us</button>
        <button onClick={() => scrollToSection('join')} className="nav-link">Join us</button>
      </div>*/
  //TODO change the link for the explore button to the explore page when finished.
  return (
    <nav className="navbar">

      {/* Right side: profile button */}
      <div className="nav-inner">
        <ProfileButton isLoggedIn={isLoggedIn} />
        <Link href="/events" className="nav-link">Events</Link>
        <a href="#explore" className="nav-link">Explore</a>
        <a href="#mission" className="nav-link">Our Mission</a>
        <a href="#about" className="nav-link">About us</a>
        <a href="#join" className="nav-link">Join us</a>
        <a href="#contact" className="nav-link">Support</a>

        <ManageEvntsDropdown />

        <Link href="clientLanding" className='nav-link'>client</Link>
        <Link href="dashboard" className='nav-link'>d-board</Link>
      </div>
    </nav>
  );
}
