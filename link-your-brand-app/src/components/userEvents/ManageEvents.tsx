'use client';
import { useState, useEffect, FormEvent } from 'react';

interface MyFormProps {
  onSubmit: () => void;  // or whatever shape you need
}

type Event = {
  id: number;
  title: string;
  description: string | null;
  organizer_cognito_id: string | null;
  rsvp_count: number | null;
  location_type: "in_person" | "remote" | "hybrid";
  address: string | null;
  start_time: string | null;
  end_time: string | null;
  organizer_contact: string | null;
  tags: any;
  created_at: string;
};

async function getIdToken() {
  const res = await fetch("/api/auth/id-token", {
    method: "GET",
    credentials: "include", // important: sends cookies
  });

  const data = await res.json();
  console.log(data);
  return data;
}
//the sub is the UUID

export default function ManageEvents({ onSubmit }: MyFormProps){
    //also need to 
    const [data, setData] = useState<Event[] | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [edit, setEdit] = useState(false);
    const [delay, setDelay] = useState(false);
    const [uuid, setID] = useState(null);
    const [eId, setEid] = useState<Number | null>(null);

    //edit usestates
    const [email, setEmail] = useState('');
        const [eventname, setEventname] = useState('');
        const [eventDate, setEventDate] = useState();
        const [startTime, setStartTime] = useState();
        const [endTime, setEndTime] = useState();
        const [des, setDes] = useState('');
        const [virt, setVirtual] = useState(false);
        const [addresss, setAddresss] = useState();
        const [numAttend, setNumAttend] = useState();

    //loads all of organizers active events.
    useEffect(() => {
        const loadEvent = async () => {
        try {
            setID(await getIdToken());

            if(!uuid) return;
            const res = await fetch('/api/database/event/myEvent/?uuid=${uuid.claims.sub}', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const json = await res.json();
            setData(json);
            setEvents(json)
        } catch (err) {
            console.error("Failed to load events:", err);
        }
        };

        loadEvent();
    }, [uuid]);

    //will start by calling the editing routes.
    const onEdit = async (bdy:Event) => {
        const id = bdy.id;
        const res = await fetch('/api/database/event/?id=${id}', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bdy)
        });
    }

    const handleEdit = (eventId: number | null = null) => {
        if (eventId !== null) {
            // Open edit form for this event
            setEid(eventId);
            setEdit(true);
        } else {
            // Close edit form
            setEid(null);
            setEdit(false);
        }
    }


    //does not need the body just the event id.
    const onDelete = async (bdy:Event) => {
        const id = bdy.id;
        const res = await fetch('/api/database/event/?id=${id}', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.json();
    }
    //TODO Fix the rsvp count
    //TODO get the inital created at time or change to current time of edit.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit();
            var remote:string = "in-person";
            if(virt === true){
                remote = "remote";
            }

            //TODO get id from loop and pass it here somehow.
            const updated:Event = {
                id: Number(eId),
                title: eventname,
                description: des,
                organizer_cognito_id: uuid,
                rsvp_count: 0,
                location_type: "remote",
                address: String(addresss),
                start_time: String(startTime),
                end_time: String(endTime),
                organizer_contact: email,
                tags: ["tech", "test"],
                created_at: "blah",
            }
            onEdit(updated);
            //this should now call the onEdit method and pass in all the use
            //states.
        };

    return(
        <div className='container-fluid'>
            {!edit && !delay &&
                <ul>
                {events.map((event, index) =>
                    <li key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>Location: {event.location_type}</p>
                    <p>RSVP Count: {event.rsvp_count}</p>
                    <p>Address: {event.address}</p>
                    <p>Starts: {event.start_time}</p>
                    <p>Ends: {event.end_time}</p>

                    <button onClick={() => handleEdit(event.id)}>Edit</button>
                    <button onClick={() => {
                        onDelete(event)
                        .then(res => console.log("Deleted:", res))
                        .catch(err => console.error(err));
                    }}>Remove</button>
                    <button>Postpone</button>
                    <button>Pin</button>
                    </li>  
                )}
            </ul>
            }
            {edit && !delay &&
                <div>
                    <button onClick={() =>handleEdit(Number(eId))}>exit</button>
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
                                        required/>
                                        <br/>
                    
                                        <div className='col'>
                                            <label htmlFor='start' className='form-label'>Start Time</label> <br/>
                                            <input 
                                            type='time' 
                                            id='etime' 
                                            name='start'
                                            value={startTime} 
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
                                        value={addresss} 
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
                                        value={numAttend}/>
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
                    
                                    <div className='row text-center'>
                                        <label className='form-label'>Event Tags</label>
                                        <br/>
                                        <input type='hidden' id='etags' name='tags' required/>
                                    </div>
                                    <br/>
                    
                                    <div className='row'>
                                        <button type='submit' className='btn btn-outline-primary'>Create</button>
                                    </div>
                    
                                </form>
                </div>
            }
            {edit && delay &&
                <div>
                    <p>I am working</p>
                </div>
            }
        </div>
    );

}