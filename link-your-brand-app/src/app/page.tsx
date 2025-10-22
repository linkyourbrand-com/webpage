"use client";
import Link from 'next/link';
import ProfileButton from '../components/ProfileButton';
import NavBar from '../components/NavBar';
import './globals.css';

export default function HomePage() {
  const userStatus = true;

  return (
    <main>
      <div className="top-right-position-wrapper"> 
        <ProfileButton isLoggedIn={userStatus} />
      </div>
      <NavBar />

      <section className="hero">
        <h1>Welcome to LinkyourBrand !
        <br /> <br />Hosting your brand events has never been easier</h1>
        <p className="lead">
          LinkyourBrand is a web app designed to help businesses plan, budget and scale events.<br />
          <br />
          Create an account to showcase your brand, build digital flyers for events, and
          let attendees sign up directly. <br /> <br />When you create an event, attendees can register
          and receive instant updates so they always know what's next.
        </p>
        <h3 id="section-head">Who We Are</h3>
            <section id='about'>We are college students, with hopes of bridging the gap between the classroom and workplace.<br/>
                We are young professionals fighting an uphill battle.<br/>
                We are driven by innovation.<br/>
                We are the future of engineering.<br/>
                <br/>
                Sincerely,<br/>
                Link Your Brand
            </section>
        <h3 id="section-head">Our Mission</h3>
            <section id='mission'>Organizing and hosting an event is difficult, time consuming, and frustating.<br/>
                Those in charge already have a lot on their plates, but what is there anything that can be simplified?<br/>
                Of course there is, setting up or paying developer to setup a landing page can be expensive and technically challeging.<br/>
                However, our goal at Link Your Brand is to simply the task of creating a landing page for event organizers.<br/>
                Using a templating system, the creation of a webpage has never been easier and affordable.<br/>
        </section>
        <h3 id="section-head">Join Us</h3>
            <section id='join'>Are you an innovator?<br/>
                Do you have what it takes?
            </section>
            <button>
                <Link href="#">Apply</Link>
        </button>
        

        <div className="cta-row">
          <a href="/signup" className="btn primary">Create account</a>
          <br />
          <br />
          <a href="/create-flyer" className="btn secondary">Create an event</a>
        </div>
      </section>
    </main>
  );
}