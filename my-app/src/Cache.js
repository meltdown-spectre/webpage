import React from 'react';
import Sidebar from './Sidebar';
import Cachepic from './resources/Cache_pic.png';
import CacheDatapic from './resources/Cache_dataflow_pic.png';
import posed from 'react-pose';

const P = posed.p({
    enter: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
  });

const Img = posed.img({
    enter: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
})

class Cache extends React.Component {
    render() {
        return (
            <div>
                <div className="menu-item">
                    <Sidebar />
                </div>
                <div className="text-wrapper">
                    <header className="Headers ">Cache</header>
                    <P>The Cache is a small static memory usually inside or very close to the CPU. It stores information
                        that are most likely needed by the CPU. Which information from the Random Access Memory (RAM) is loaded in the Cache depends
                        on certain algorithms and assumptions. The main goal of the Cache is to provide the next bit of
                        data to the CPU at the fastest time possible.
                        The Cache stores data in a hierarchy of levels. All modern multi-core CPUs have at least a 
                        three-level cache (sometimes four).</P>
                    <div className="SubHeader">
                            <P>L1-cache</P>
                    </div>
                        <P>L1-cache is the fastest and the smallest one. It usually has a size of 256KByte to 2 MByte.
                        L1 stores data that are most likely needed by the CPU.</P>
                    <div className="SubHeader">
                            <P>L2-cache</P>
                    </div>
                        <P>L2-cache is the second fastest cache and has a size of 256KByte to 8MByte.
                        Usually, every core in a CPU has its own L1 and L2-cash</P>
                     <div className="SubHeader">
                            <P>L3-cache</P>
                    </div>
                        <P>L3-cache has a size of 4MByte and 50 MByte and is at the lowest level of the three caches.
                        It stores data that is usually shared among all cores.
                    </P>
                    <div >
                        <Img className="Picture" src={Cachepic} alt="Cache_pic"></Img>
                        <P> A cache is further partitioned into blocks. No matter whether a cache is read
                            or written, it's done one block at a time. Each block has a tag that includes
                            the location where the block is stored in the cache.
                            When data is requested, the CPU starts with looking through the tags to find 
                            the specific content that is needed in L1. If the data isn't found, more searches
                            are conducted in L2 and after that in L3.  A cache hit 
                            describes the situation where your data is successfully served from the cache.
                            If the data isn't found at all, the CPU will look in the RAM and write the data 
                            into the cache to find it quicker the next time. 
                         </P>
                         <Img className="Picture2" src={CacheDatapic} alt="Cache_dataflow_pic"></Img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cache;