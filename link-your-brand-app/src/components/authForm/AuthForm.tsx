'use client';
import React from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

//TODO create method to register user and sign in.
type logType = {
    logReg: boolean;
}


export default function AuthForm({ logReg }: logType){
    //in future need to add other fields for registering like name, etc
    const router = useRouter();
     //0 for register, 1 for login.
    const [username, setUsername] = useState(''); // should be an email
    const [password, setPassword] = useState('');
    const [organizer, setOrganizer] = useState(false);
    const [location, setLocation] = useState();

        async function handleLogin(e: any){
            //e.preventDefault();
            
            try{
                const res = await fetch('/api/auth/signin',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email:username, password })
                })

                const data = await res.json()
                if(!res.ok){
                    console.error("Login Failed", data.error);
                    //if current page is the company landing go to dashboard if organizer else explore
                    //otherwise just redirect to current page with user info.
                    //router.push("/explore");
                }
                else{
                    console.log("Login Successful", data);
                    sessionStorage.setItem("accessToken", data.accessToken);
                }
            }
            catch(err){
                console.error("Network Error:", err);
            }
        }

        async function handleSignup(e: any){
            //e.preventDefault();

            try{
                const res = await fetch('/api/auth/signup', {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email:username, password })
                })
                //will add more to fill in userinfo to the drizzle db.

                const data = await res.json()
                if(!res.ok){
                    console.error("Signup failed", data.error);
                }
                else{
                    console.error("Signup  successful", data);
                }
            }catch(err){
                console.error("Network error:", err);
            }
        }


    return(
        <div>
            {logReg == true &&
             <form onSubmit={handleLogin}>
                <div className='row'>
                    <label className='form-label'>Username</label>
                    <input 
                    type='email'
                    id='uName'
                    className='form-control'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className='row'>
                    <label>Password</label>
                    <input 
                    type='password'
                    id='pw'
                    className='form-control'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div className='row'>
                    <button type='submit' className='btn btn-outline-primary'>Login</button>
                </div>

             </form>
            }

            {logReg == false &&
            <form onSubmit={handleSignup}>
                <div className='row'>
                    <label>Email</label>
                    <input 
                    type='email'
                    id='uName'
                    className='form-control'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className='row'>
                    <label>Name</label>
                </div>
                <div className='row'>
                    <label>Password</label>
                    <input 
                    type='password'
                    id='pw'
                    className='form-control'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div className='row'>
                    <label>Organizer?</label>
                    <input 
                    className='form-check-input' 
                    type='checkbox' 
                    id='organizer' 
                    name="option" 
                    checked={organizer}                 // controlled
                    onChange={(e) => setOrganizer(e.target.checked)}
                    />
                </div>
                <div className='row'>
                    <label>Zip Code</label>
                    <input 
                    type='address'
                    id='loc'
                    value={location}
                    required
                    />
                </div>
                <div className='row'>
                    <button type='submit' className='btn btn-outline-primary'>Create</button>
                </div>

            </form>
            }

        </div>
    )
}