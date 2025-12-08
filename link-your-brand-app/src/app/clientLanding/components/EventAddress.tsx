"use client";
import { useState } from 'react';

type propType = {
    virtual: boolean;
    address: string;
}

export default function EventAddress({virtual, address}: propType){
    
    return(
        <div>
            {virtual == false &&
                <div>
                    <iframe></iframe>
                </div>
            }
            {virtual == true &&
                <div>
                    <a href={address} className='row'>Link</a>
                    <img className='row' src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXA2djhmYmwwODRlMjRjbmJ3azRtbml0engzNHNrMmtyczVrZGFmZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10zxDv7Hv5RF9C/giphy.gif'></img>
                </div>
            }
        </div>
    );
}