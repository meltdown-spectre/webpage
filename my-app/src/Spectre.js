import React from 'react';
import Sidebar from './Sidebar';

class Spectre extends React.Component {
  render() {
    return (
      <div>
        <div classname="menu-item">
          <Sidebar />
        </div>
        <div>
          <header className="Headers">Spectre</header>
          <p>These are the details of Spectre</p>
        </div>
      </div>
    )
  }
}

export default Spectre