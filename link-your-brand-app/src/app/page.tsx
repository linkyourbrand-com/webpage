import ProfileButton from '@/components/ProfileButton';
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
export default page;