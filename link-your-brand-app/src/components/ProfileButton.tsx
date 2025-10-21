'use client';
import Link from 'next/link';
import { useState } from "react";

interface ProfileButtonsProps {
    isLoggedIn: boolean;
}
export default function ProfileButton({isLoggedIn}: ProfileButtonsProps) {
  //Open and close dropdown menu logic
  const [isOpen, setIsOpen] = useState(false);
  //Toggle dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="profile-button-container">
      {isLoggedIn ? (
        <>
    <button className="profile-toggle" onClick={toggleDropdown}>
    <img src="/profile-image.png" alt="Profile" />
    </button>

    {isOpen && (
      <div className = "dropdown-menu">
      <Link href = "/profile" className = "dropdown-item" > Profile</Link>
      <Link href="/settings" className="dropdown-item">Settings</Link>
      <Link href="/logout" className="dropdown-item">Logout</Link>
            </div>)}
    </>
    ):(
      <Link href="/login-signup" className="login-signup-link">
        Login / Signup</Link>
    )}
    </div>
  );
}