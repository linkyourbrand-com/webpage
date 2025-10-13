import ProfileButton from '@/components/ProfileButton';
import AboutUsSection from '@/components/AboutUsSection';
import OurMissionSection from '@/components/OurMissionSection';
const page = () => {
    return(
    <div>
        <ProfileButton username='james' loggedIn></ProfileButton>
        <div className="main-content">
            <AboutUsSection></AboutUsSection>
            <hr/>
            <OurMissionSection></OurMissionSection>
        </div>
    </div>); 
}
export default page;