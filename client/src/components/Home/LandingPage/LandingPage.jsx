import React from "react";
import {Link} from 'react-router-dom';
import bgImage from '../LandingPage/video/background-video.mp4'
import './LandingPage.css'


function LandingPage() {
    return (
        <div className='landingPage'>
            <div className="overlay"></div>
            <video autoPlay loop muted src={bgImage} type='video/mp4' />
            <div className="content">
                <h1>Welcome to Dogs APP</h1>
                <Link to='/home'>
                    <button className="btn"><span>GET IN</span></button>
                </Link>
            </div>
        </div>
    )
}


export default LandingPage;