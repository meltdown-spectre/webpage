import React from 'react';
import { elastic as Menu } from 'react-burger-menu';
import { BrowserRouter as Switch, Link } from 'react-router-dom';
import Sidebar from './Sidebar';


class VM extends React.Component {
    render() {
        return (
            <div>
                <div classname="menu-item">
                    <Sidebar />
                </div>
                <div>
                    <header className="Headers">Virtual Memory</header>
                    <p>ToDo</p>
                </div>
            </div>
        )
    }
}

export default VM;