import './clientLanding.css';
import EventAddress from './components/EventAddress';
import EventDes from './components/EventDes';
import EventRsvp from './components/EventRsvp';
import EventStats from './components/EventStats';
import NavBar from '@/components/NavBar';

export default function ClientLandingPage(){
    //todo need to pass in parameters for the event info.
    //todo pass custom object top component with all nessacary fields.
    const title = "Event name";

    return(
        <main>
            <NavBar />
            <div className="center">
                <div className='row titl'>
                    <h2>{title}</h2>
                </div>
                <div className='row'>
                    <div className='col'>
                        <EventDes description={"This is an event"} />
                    </div>
                    <div className='col'>
                    </div>
                    <div className='col'>
                        <EventAddress virtual={true} address={"https://giphy.com/explore/the-matrix"}/>
                    </div>
                </div> 
                <div className='row'>
                    <div className='col'></div>
                    <div className='col justify-content-center'>
                        <EventRsvp />
                    </div>
                    <div className='col'></div>
                </div> 
                <div className='row'>
                    <div className='col'></div>
                    <div className='col'>
                        <EventStats start={"1:00am"} end={"2:00am"} email={"test@gmail.com"} rsvps={200}/>
                    </div>
                    <div className='col'></div>
                </div>
            </div>

        </main>
    );
}