"use client";
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

        <div className="cta-row">
          <a href="/signup" className="btn primary">Create account</a>
          <br />
          <br />
          <a href="/create-flyer" className="btn secondary">Create a digital flyer</a>
        </div>
      </section>
    </main>
  );
}