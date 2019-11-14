import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Switch, Link} from 'react-router-dom';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="menu-item">
                <Menu>
                    <div className="menu-item">
                        <Link to="/" className="menu-item">Home</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/Cache" className="menu-item">Cache</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/VM" className="menu-item">Virtual Memory</Link>
                    </div>
                    <div >
                        <Link to="/OutOfOrder" className="menu-item">Out of Order Execution</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/Meltdown" className="menu-item">Meltdown</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/Spectre" className="menu-item">Spectre</Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/Mitigations" className="menu-item">Mitigations</Link>    
                    </div> 
                </Menu>
            </div>

        );
    }
}

export default Sidebar;