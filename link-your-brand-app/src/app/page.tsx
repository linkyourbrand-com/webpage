/*import ProfileButton from '@/components/ProfileButton';
import AboutUsSection from '@/components/AboutUsSection';
import OurMissionSection from '@/components/OurMissionSection';
import JoinUsSection from '@/components/JoinUsSection';
const page = () => {
    return(
    <div>
        <ProfileButton username='james' loggedIn></ProfileButton>
        <div className="center continer-fluid">
            <AboutUsSection></AboutUsSection>
            <hr/>
            <OurMissionSection></OurMissionSection>
            <hr/>
            <JoinUsSection></JoinUsSection>
        </div>
    </div>); 
}
export default page;*/
"use client";
import ProfileButton from '../components/ProfileButton';
import AboutUsSection from '@/components/AboutUsSection';
import OurMissionSection from '@/components/OurMissionSection';
import JoinUsSection from '@/components/JoinUsSection';
import CarouselExamples from '@/components/CarouselExamples';
import NavBar from '../components/NavBar';
import './globals.css';

export default function HomePage() {
  const userStatus = true;

  return (
    <main>
      <div className="top-right-position-wrapper"> 
        <ProfileButton loggedIn={userStatus} />
      </div>
      <NavBar />
      <div className='center'>
        <CarouselExamples />
        <hr />
        <AboutUsSection />
        <hr />
        <OurMissionSection />
        <hr />
        <JoinUsSection />
      </div>



      <section className="hero">

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
