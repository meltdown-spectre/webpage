import React from 'react';
import { elastic as Menu } from 'react-burger-menu';
import { BrowserRouter as Switch, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

class Cache extends React.Component {
    render() {
        return (
            <div class = "Stephan">
            <div class = "menu-item">
                <Sidebar/>
            </div>
            <div>
                <header class="Headers ">Cache</header>
                <p>The Cache is a small static memory usually inside or very close to the CPU. It stores information
                    that are most likely to need next by the CPU. Which information is loaded in the Cache depends 
                    on certain algorithms and assumptions. The main goal of the Cache is to provide the next bit of
                    data to the CPU it will need. 
                    There are three different types of caches. L1-,L2- and L3-cache. L1-cache is the fastest
                    and the smallest one. It usually has a size of 256KByte to 2 MByte. L1 stores data that are most 
                    likely needed by the CPU.
                    L2-cache is the second fastest cache and has a size of 256KByte to 8MByte.
                    L3-cache has a size of 4MByte and 50 MByte.


                </p>
            </div>
            </div>
                )
    }
}

export default Cache;