import React from 'react'; 
import Navbar from '../components/common/Navbar';
import LandingCarousel from '../components/customer/landingpage/LandingCarousel'
function LandingPage() {
    
    return (
        <div style={{ flexGrow: 1 }}>
            <Navbar/>
            <LandingCarousel/>
        </div>

    );
}

export default LandingPage;
