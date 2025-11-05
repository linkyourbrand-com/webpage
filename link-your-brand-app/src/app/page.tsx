"use client";
import NavBar from '../components/NavBar';
import FileUploadForm from '../components/FileUploadForm';
import './globals.css';

export default function HomePage() {
  const userStatus = true;

  return (
    <main>
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
            
        

        <div className="cta-row">
          <a href="/signup" className="btn primary">Create account</a>
          <br />
          <br />
        </div>
        
        <div style={{ marginTop: 24 }}>
          <h3>Upload an event flyer</h3>
          <FileUploadForm />
        </div>
      </section>
    </main>
  );
}