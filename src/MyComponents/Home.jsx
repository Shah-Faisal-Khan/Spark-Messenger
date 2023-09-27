import React from 'react';
import Sidebar from './homeComponents/Sidebar';
import Chatscreen from './homeComponents/Chatscreen'

const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            {/* hwllo */}
            
            <Sidebar/>
            
            <Chatscreen/>
            
            
        </div>
      
    </div>
  )
}

export default Home
