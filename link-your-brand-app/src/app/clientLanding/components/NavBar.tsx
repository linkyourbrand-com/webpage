"use client";
import React from 'react';
import { useState } from 'react';
import ProfileButton from '@/components/ProfileButton';
import ManageEvntsDropdown from '@/components/userEvents/ManageEvntsDropdown';
import CreateEventDropdown from '@/components/createEvent/CreateEventDropdown';
import Link from 'next/link';


export default function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    //TODO get loggedin status from cookies
    //TODO link to explore/events page.

    return(
        <div>
            <nav className='navbar'>
                <div className='nav-inner'>
                    {isLoggedIn && 
                        <div>
                            <a href='#explore' className='nav-link'>Explore</a>
                            <ManageEvntsDropdown />
                            <CreateEventDropdown />
                            <ProfileButton isLoggedIn={isLoggedIn}/>
                        </div>
                    }
                    {!isLoggedIn &&
                        <div>
                            <a href='#explore' className='nav-link'>Explore</a>
                            <ProfileButton isLoggedIn={isLoggedIn}/>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
}