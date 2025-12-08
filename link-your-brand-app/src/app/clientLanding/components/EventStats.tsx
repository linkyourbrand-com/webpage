"use client";

type propTypes ={
    start: string;
    end: string;
    email: string;
    rsvps: number;
}

export default function EventStats({start, end, email, rsvps}:propTypes){

    return(
        <div className="pagePanel">
            <p>Event Stats:</p>
            <br/>
            <p>Start Time: {start}</p>
            <p>End Time: {end}</p>
            <p>Organizer Email: {email}</p>
            <p>Number of RSVPs: {rsvps}</p>
        </div>
    );
}