import React, { useEffect, useState } from 'react'
import Sidebar from '../chatComp/Sidebar'
import Chat from '../chatComp/Chat'

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  //  const handleResize = () => {
  //   setShowSidebar(window.innerWidth > 768);
  // };

   useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowSidebar(true);
    } else {
      setShowSidebar(true); 
    }
  }, []);
  return (
    <div className="home">
        <div className="homeContainer">
           {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <Chat showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
    </div>
  )
}

export default Home