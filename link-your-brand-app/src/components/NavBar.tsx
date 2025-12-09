"use client";
import React from 'react';
import Link from 'next/link';
import ProfileButton from './ProfileButton';

export default function NavBar () {
  return (
    <nav className="navbar">

      <div className="nav-inner">
        <ProfileButton isLoggedIn={false} />
        <Link href="/events" className="nav-link">My Events</Link>

        <Link href="/dashboard" className='nav-link'>Client D-board</Link>
      </div>
    </nav>
  );
}
