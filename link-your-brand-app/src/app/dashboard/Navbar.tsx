"use client";
import React from 'react';
import { useState } from 'react';
import ProfileButton from '@/components/ProfileButton';
import ManageEvntsDropdown from '@/components/userEvents/ManageEvntsDropdown';
import CreateEventDropdown from '@/components/createEvent/CreateEventDropdown';
import Link from 'next/link';

export default function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    return(
        <div>
            <nav className='navbar'>
                <div className='nav-inner'>
                    <a href='/events' className='nav-link'>Explore</a>
                    <ManageEvntsDropdown />
                    <CreateEventDropdown />
                    <ProfileButton isLoggedIn={isLoggedIn}/>
                </div>
            </nav>
        </div>
    );
}