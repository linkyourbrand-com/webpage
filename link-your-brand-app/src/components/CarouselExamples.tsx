'use client';
import React from 'react';

export default function JoinUsSection(){

    return(
        <div className='main-section'>
            <div className='carousel slide' data-bs-ride='carousel' id='carousel-main'>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="https://imgs.search.brave.com/3ITc5KTHq3cCGBpQkN0IcQjnftCo6E4hO8xFtKJPDmE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8x/Mi8xOS8xNC8xNC9u/ZXcteW9yay03NjY1/Nzk5XzY0MC5qcGc" alt="Los Angeles" className="d-block w-100"/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://imgs.search.brave.com/s6KKHoSmzaCSaehMhbrTmPIvzWKtmH2UbudeBcW-8vM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTg0/MzUwMzY1L3Bob3Rv/L2Rvd250b3duLWNo/aWNhZ28uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVBhREIw/aTVnMnpqRGh5dHlT/WlR6RmcwZzVUYnRZ/cWppVVZXRkYzTXow/dVU9" alt="Chicago"/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://imgs.search.brave.com/wXXKUUdblvGwkkZ5eubXTj35h1kLlXBlIgnbp50x6QM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/MDgzNTcyMi9waG90/by9zZWF0dGxlLWF0/LWRhd24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWRLZno3/eUkzV21mSEEzSEZY/c1ZZN3FQdXBidndJ/LWwya253T2dhd0My/U289" alt="Seattle" />
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carousel-main" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel-main" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
    
}