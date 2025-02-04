import React, { useState } from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Overlay from './pages/Overlay';
import Navbar from './Components/Navbar';
import Dashboardnav from './Components/Dashnav';
import Dashboardside from './Components/Sidebar';
import { DarkModeProvider } from "./Components/Darkmode";



const App = () => {
    // State to track if right panel is active
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Toggle panel state on button click
    const handleOverlayClick = () => {
        setIsRightPanelActive((prev) => !prev); // Toggle state
    };

    return (
        <DarkModeProvider>
        <div className="dashboard">
            <Dashboardside/>
            <Dashboardnav />
        </div>
    </DarkModeProvider>
       
        
    //     <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            
    //         <SignIn />
    //         <SignUp />
    //         <Overlay />
    //         <button id="overlayBtn" onClick={handleOverlayClick}>
    //             {isRightPanelActive ? 'Switch to Sign In' : 'Switch to Sign Up'}
    //         </button>
    //     </div>
       
        // <Navbar/>
    );
};

export default App;