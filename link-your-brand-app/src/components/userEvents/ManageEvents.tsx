'use client';
import { useState } from 'react';


export default function ManageEvents(){
    //need to grab all of coming events for an organizer then display them.
    //TODO get all of organizers events,
    //also need to 
    const events = ["Hiring event", "clubbing"];

    return(
        <div>
            <ul>
                {events.map((event, index) => 
                    <li key={index}>
                        {event}
                        
                        <button>Edit</button>
                        <button>Remove</button>
                        <button>Postpone</button>                        
                        </li>
                )}
            </ul>
        </div>
    );

}