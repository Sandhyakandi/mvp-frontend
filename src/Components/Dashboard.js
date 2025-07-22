import React, { useState , useEffect} from "react";
import TopNavbar from "./UI/TopNavbar";
import ClaudeAPIintegration from "./ClaudeAPIintegration";
import Map from "./Map";

const Dashboard = ({user,setUser}) => {

const [geoJsonData, setGeoJsonData] = useState(null);
const [responseText, setResponseText] = useState("");

 return (
    <div className="flex flex-col h-screen font-sans text-[#212121] text-[14px]">
      <TopNavbar user={user} setUser={setUser}/>

      <div className="flex flex-1 overflow-hidden">
        {/* Map Section */}
        <div className="w-full lg:w-[65%] p-4 bg-gray-100 overflow-auto">
           {/* <Map geoData={mergedGeoData} /> */}
             <Map geoJsonData={geoJsonData}  />
        </div>

        {/* Claude Panel */}
        <aside className="transition-transform duration-500 transform translate-x-0 w-full lg:w-[35%] p-4 bg-white border-l overflow-auto">
  <ClaudeAPIintegration   setGeoJsonData={setGeoJsonData} responseText={responseText}
          setResponseText={setResponseText}  />
    {responseText && (
          <div className="mt-4 text-green-700 font-medium">
            {responseText}
          </div>
        )}
</aside>

      </div>

     <footer className="bg-gray-200 text-sm text-[#757575] px-6 py-2">
  <div className="flex justify-between">
    <span>Processing status: "Idle"</span>
    <span>System: All systems operational</span>
  </div>
</footer>
    </div>
  );
}
export default Dashboard;


