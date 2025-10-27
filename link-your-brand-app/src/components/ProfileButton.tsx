'use client';
import React, { useState } from 'react';

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
export default ProfileButton;