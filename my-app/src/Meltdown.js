import React from 'react';
import Sidebar from './Sidebar';

class Meltdown extends React.Component{
    render(){
      return(
        <div>
          <div classname="menu-item">
            <Sidebar />
          </div>
        <div class = "Letters">
            <header className="Headers">Meltdown</header>
            <p>These are the details of Meltdown</p>
        </div>
        </div>
      )
    }
}

export default Meltdown

