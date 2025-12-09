"use client";
import React from 'react';
import { useState } from 'react';
import ManageEvntsDropdown from '@/components/userEvents/ManageEvntsDropdown';
import CreateEventDropdown from '@/components/createEvent/CreateEventDropdown';

export default function NavBar(){


    return(
        <div>
            <nav className='navbar'>
                <div className='nav-inner'>
                    <a href='/events' className='nav-link'>Explore</a>
                    <ManageEvntsDropdown />
                    <CreateEventDropdown />
                    {/* <ProfileButton isLoggedIn={isLoggedIn}/> */}
                </div>
            </nav>
        </div>
    );
}