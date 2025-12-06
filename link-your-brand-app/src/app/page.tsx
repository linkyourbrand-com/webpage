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
import Map from "@/components/Map";
import ProfileButton from '../components/ProfileButton';
import AboutUsSection from '@/components/AboutUsSection';
import OurMissionSection from '@/components/OurMissionSection';
import JoinUsSection from '@/components/JoinUsSection';
import CarouselExamples from '@/components/CarouselExamples';
import NavBar from '../components/NavBar';
//import FileUploadForm from '../components/FileUploadForm';
import './globals.css';

export default function HomePage() {
  const userStatus = true;

  return (
    <main>
      <ProfileButton username="james" isLoggedIn={userStatus} />
      <NavBar />
      <div className='center'>
        <CarouselExamples />
        <hr />
        <AboutUsSection />
        <hr />
        <OurMissionSection />
        <hr />
        <JoinUsSection />
        <hr />
        <Map lat={40.7128} lng={-74.0060} />
      </div>



      <section className="hero">

        <div className="cta-row">
          <a href="/signup" className="btn primary">Create account</a>
          <br />
          <br />
        </div>
      </section>
    </main>
  );
}
