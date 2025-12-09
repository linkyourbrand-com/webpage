"use client";
import Image from 'next/image';
import NavBar from '../components/NavBar';
import logoImg from '@/media/link-your-brand logo.png';
import './globals.css';

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-logo">
            <Image
              src={logoImg}
              alt="Link Your Brand logo"
              width={220}
              height={220}
            />
          </div>
          <div className="landing-hero-content">
            <h1 className="landing-title">Link Your Brand</h1>
            <p className="landing-subtitle">
              Create shareable event pages with QR codes so your attendees
              can register in seconds and stay in the loop.
            </p>
            <div className="landing-cta-row">
              <a href="/events" className="btn secondary">View my events</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
