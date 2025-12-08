"use client";
import { useState } from 'react';

export default function EventRsvp(){
    //in theory should be able to get all of users using cookies
    //using the uid in the cookies to look up.
    //TODO write handle click function.
    const [clicked, setClicked] = useState(false);
    //might be costly to allow user to change their rsvp status easily.

    return(
        <div className='pagePanel'>
            <button onClick={() => setClicked(!clicked)} className='btn btn-warning'>RSVP</button>
        </div>
    );
}