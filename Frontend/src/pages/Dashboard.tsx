import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsSection from "../components/dashboard/StatsSection";
import ActiveRoom from "../components/dashboard/ActiveRooms";
import TopScore from "../components/dashboard/TopScore";
import BottomCTA from "../components/dashboard/BottomCTA";

function Dashboard(){

    const navigate = useNavigate();

    //useEffect runs
    useEffect(()=>{
       
        //get token
        const existingToken = sessionStorage.getItem("token");

        if(!existingToken){
            navigate("/login");
        }
        
    },[navigate]);

    return (
        <div className="min-h-screen flex bg-[#050816] text-white">
            <Sidebar/>

            <main className="flex-1 p-8">
                <Topbar/>

                <WelcomeBanner/> 

                <StatsSection/>

                <div className="grid grid-cols-3 gap-6">

                    <div className="col-span-2">
                        <ActiveRoom/>
                    </div>

                    <div>
                        <TopScore/>
                    </div>
                </div>

                <BottomCTA/>
            </main> 
        </div>
    )
}

export default Dashboard;