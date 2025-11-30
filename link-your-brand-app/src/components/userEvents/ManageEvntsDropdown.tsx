'use client';
import { useState, MouseEvent } from 'react';
import ManageEvents from './ManageEvents';


export default function ManageEvntsDropdown(){
    const [isOpen, setOpen] = useState(false);
    const toggleDown = () => setOpen(prev => !prev);
    const stopProp = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return(
        <div className='dropdown'>
            <button type='button' onClick={toggleDown} className='btn btn-outline-primary'>My Events</button>

            {isOpen && (
                <div className='dropdown-content p-3' onClick={stopProp}>
                    <ManageEvents />
                </div>
            )}

        </div>
    );

}