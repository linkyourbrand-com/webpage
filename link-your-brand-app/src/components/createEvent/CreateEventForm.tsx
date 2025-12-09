'use client';
import React, { useState, FormEvent } from 'react';

interface MyFormProps {
    onSubmit: () => void;  // or whatever shape you need
}

async function createEvent(data:any){
    const res = await fetch("/api/database/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return res.json();
}

//TODO implement search of db for stored tags.
export default function CreateEventForm({ onSubmit }: MyFormProps){
    const [email, setEmail] = useState('');
    const [eventname, setEventname] = useState('');
    const [eventDate, setEventDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [des, setDes] = useState('');
    const [virt, setVirtual] = useState(false);
    const [address, setAddress] = useState('');
    const [numAttend, setNumAttend] = useState<number | ''>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const organizerId = email || null;

            let locationType: 'in_person' | 'remote' = 'in_person';
            if (virt) {
                locationType = 'remote';
            }

            const startDateTime = eventDate && startTime ? new Date(`${eventDate}T${startTime}:00`) : null;
            const endDateTime = eventDate && endTime ? new Date(`${eventDate}T${endTime}:00`) : null;

            await createEvent({
                title: eventname,
                description: des,
                organizerId,
                attendCount: numAttend || 0,
                location_type: locationType,
                addy: address,
                start_time: startDateTime,
                end_time: endDateTime,
                organizer_contact: email,
                eventTags: ["tech", "test"],
            });

            onSubmit();
        } catch (err) {
            console.error('Failed to create event', err);
            alert('Something went wrong creating the event.');
        }
    };

    return(
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor="text" className='form-label text-center'>Event Name</label>
                    <input 
                    type='text' 
                    id='eventName' 
                    placeholder='Burning Man' 
                    className='form-control' 
                    name='ename' 
                    value={eventname}
                    onChange={(e) => setEventname(e.target.value)}
                    required/>
                </div>

                <div className='row'>
                    <label htmlFor='date' className='form-label center-text'>Event Date</label> <br/>
                    <input 
                    type='date' 
                    id='etime' 
                    name='time'
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)} 
                    required/>
                    <br/>

                    <div className='col'>
                        <label htmlFor='start' className='form-label'>Start Time</label> <br/>
                        <input 
                        type='time' 
                        id='etime' 
                        name='start'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)} 
                        required/>
                    </div>
                    <div className='col'></div>
                    <div className='col'>
                        <label htmlFor='end' className='form-label'>End Time</label> <br/>
                        <input 
                        type='time' 
                        id='etime' 
                        name='end'
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)} 
                        required/>
                    </div>

                </div>
                <hr/>

                <div className='row text-center'>
                    <label htmlFor='text' className='form-label'>Description</label>
                    <input 
                    type='text' 
                    id='eDes' 
                    name='description' 
                    className='form-control'
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                    />
                </div>

                <div className='form-check row text-center'>
                    <label htmlFor="address" className='form-label'>Virtual?</label> <br/>
                    <input 
                    className='form-check-input' 
                    type='checkbox' 
                    id='location' 
                    name="option" 
                    checked={virt}                 // controlled
                    onChange={(e) => setVirtual(e.target.checked)}/>
                </div>
                <br/>

                <div className='row text-center'>
                    <label htmlFor='text' className='form-label'>Event Address</label>
                    <input 
                    placeholder='Enter street address or virtual link' 
                    type='text' 
                    id="addy" 
                    name='address' 
                    className='form-control' 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    required/>
                </div>
                <hr/>

                <div className='row text-center'>
                    <label htmlFor='number' className='form-label'>Max # attendees</label>
                    <br/>
                    <input 
                    type='number' 
                    id='maxattend' 
                    name='max'
                    value={numAttend}
                    onChange={(e) => setNumAttend(e.target.value === '' ? '' : Number(e.target.value))}/>
                </div>

                <div className='row text-center'>
                    <label htmlFor='email' className='form-label'>Event contact email</label>
                    <br/>
                    <input 
                    type='email' 
                    id='contact' 
                    name='organizercontact' 
                    value={email}
                    placeholder='test@email.com'
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>

                <div className='row'>
                    <button type='submit' className='btn btn-outline-primary'>Create</button>
                </div>

            </form>
        </div>
    );
}