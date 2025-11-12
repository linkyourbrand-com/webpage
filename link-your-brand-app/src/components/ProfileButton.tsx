'use client';
import Link from 'next/link';
import Image from 'next/image';
import profileImg from '../media/profile-image.png';
import { useState } from 'react';

interface ProfileButtonProps {
  isLoggedIn: boolean;
  username?: string;
}

export default function ProfileButton({ isLoggedIn, username }: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((v) => !v);

  return (
    <div className="profile-button-container">
      {isLoggedIn ? (
        <>
          <button className="profile-toggle" onClick={toggleDropdown} aria-expanded={isOpen}>
            <Image src={profileImg} alt={username ? `${username} profile` : 'Profile'} width={40} height={40} className="profile-img" />
          </button>

          {isOpen && (
            <div className="dropdown-menu" role="menu">
              <Link href="/profile" className="dropdown-item">Profile</Link>
              <Link href="/settings" className="dropdown-item">Settings</Link>
              <Link href="/logout" className="dropdown-item">Logout</Link>
            </div>
          )}
        </>
      ) : (
        <Link href="/login-signup" className="login-signup-link">Login / Signup</Link>
      )}
    </div>
  );
}
/*import React, { useState } from 'react';

interface ProfileButtonsProps {
    username?: string // optional string
    loggedIn: boolean // must be a boolean
    imageUrl?: string // optional string
}
function ProfileButton({ username, loggedIn, imageUrl }: ProfileButtonsProps) {
    const [open, setOpen] = useState(false)
    // 🔁 toggles the open/closed state
    const toggleDropdown = () => setOpen(!open)
    return (
        <div>
            <button onClick={toggleDropdown}>Menu</button>
            <img src={imageUrl || 'profile image.png'} alt="Profile"
            width={50}
            height={50}/>
            {loggedIn ? (
            <button>{username}</button>
            ) : (
            <button>Login</button>
            )}
        </div>
    )
}
export default ProfileButton;*/
