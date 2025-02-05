import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Dashboardnav from './Components/Dashnav';
import Dashboardside from './Components/Sidebar';
import { DarkModeProvider } from "./Components/Darkmode";
import Logform from './pages/Authform';



const App = () => {

    return (

    //     <DarkModeProvider>
    //     <div className="dashboard">
    //         <Dashboardside/>
    //         <Dashboardnav />
    //     </div>
    // </DarkModeProvider>
        // <Navbar/>
        <Logform />
    );
};

export default App;