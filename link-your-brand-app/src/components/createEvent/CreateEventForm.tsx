'use client';
import React from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';

interface MyFormProps {
  onSubmit: () => void;  // or whatever shape you need
}

export default function CreateEventForm({ onSubmit }: MyFormProps){
    //this is for creating events not logging in.
    const [email, setEmail] = useState('');
    const [eventname, setEventname] = useState('');
    const [eventDate, setEventDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [des, setDes] = useState('');
    const [virt, setVirtual] = useState(false);
    const [address, setAddress] = useState();
    const [numAttend, setNumAttend] = useState();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return(
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text" className='form-label'>Event Name</label>
                    <input 
                    type='text' 
                    id='eventName' 
                    placeholder='Burning Man' 
                    className='form-control' 
                    name='ename' 
                    value={eventname}
                    required/>
                </div>

                <div>
                    <label htmlFor='date' className='form-label'>Event Date</label> <br/>
                    <input 
                    type='date' 
                    id='etime' 
                    name='time'
                    value={eventDate} 
                    required/>
                    <br/>

                    <label htmlFor='start' className='form-label'>Start Time</label> <br/>
                    <input 
                    type='time' 
                    id='etime' 
                    name='start'
                    value={startTime} 
                    required/>
                    <br/>

                    <label htmlFor='end' className='form-label'>End Time</label> <br/>
                    <input 
                    type='time' 
                    id='etime' 
                    name='end'
                    value={endTime} 
                    required/>

                </div>

                <div>
                    <label htmlFor='text' className='form-label'>Description</label>
                    <input type='text' id='eDes' name='description' className='form-control'/>
                </div>

                <div className='form-check'>
                    <label htmlFor="address" className='form-check-label'>Virtual?</label> <br/>
                    <input 
                    className='form-check-input' 
                    type='checkbox' 
                    id='location' 
                    name="option" 
                    checked={virt}                 // controlled
                    onChange={(e) => setVirtual(e.target.checked)}/>
                </div>
                <br/>

                <div>
                    <label htmlFor='text' className='form-label'>Event Address</label>
                    <input 
                    placeholder='Enter street address or virtual link' 
                    type='text' 
                    id="addy" 
                    name='address' 
                    className='form-control' 
                    value={address} 
                    required/>
                </div>

                <div>
                    <label htmlFor='number' className='form-label'>Max # attendees</label>
                    <br/>
                    <input 
                    type='number' 
                    id='maxattend' 
                    name='max'
                    value={numAttend}/>
                </div>

                <div>
                    <label htmlFor='email' className='form-label'>Event contact email</label>
                    <br/>
                    <input 
                    type='email' 
                    id='contact' 
                    name='organizercontact' 
                    value={email}
                    placeholder='test@email.com'
                    required/>
                </div>

                <div>
                    <label className='form-label'>Event Tags</label>
                    <br/>
                    <input type='hidden' id='etags' name='tags' required/>
                </div>

                <button type='submit' className='btn btn-outline-primary'>Create</button>

            </form>
        </div>
    );
}