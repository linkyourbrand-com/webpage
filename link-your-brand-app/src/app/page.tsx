'use client';
import ProfileButton from '../components/ProfileButton'; // Adjust path if needed
import './globals.css';

export default function HomePage() {
  const userStatus = true;

  return (
    <main>
      <div className="top-right-position-wrapper"> 
        <ProfileButton isLoggedIn={userStatus} />
      </div>
      
      <h1>Welcome to the Home Page!</h1>
    </main>
  );
}