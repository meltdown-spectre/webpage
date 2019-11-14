import React from 'react';
import Sidebar from './Sidebar';
import meltdown_miti from "./resources/Meltdown-slides-mitigation.gif"
import spectre_miti from "./resources/Spectre-slides-LFENCe.gif"

class Mitigations extends React.Component{

render(){
    return(
        <div>
            <div classname="menu-item">
                <Sidebar />
            </div>
            <div>
                <div class = "Letters">
                    <header className="Headers">Meltdown</header>
                        <div class="SubHeader">
                            Software patch
                        </div>
                        <p>
                            Patches against Meltdown have been released for Linux, Windows, and OS X. 
                            Patches for Windows and OS X are similar to the <a href = "https://en.wikipedia.org/wiki/Kernel_page-table_isolation">Linux’s Kernel page-table isolation (KPTI).</a>    
                            The idea includes isolating the kernel space memory and user space memory to prevent leaks. In these patches, there will be two separate sets of page tables for kernel mode and user mode.
                            In user mode(or unpriviledged mode), the program is only able to access certain kernel space addresses for purposes such as system calls, interrupts and exceptions.
                            Kernel data will not be available for prefetch and therefore will not be cached.  
                        </p>
                        <img src= {meltdown_miti} className="anime"></img>
                        <div class="SubHeader">
                            Cost of software patch
                        </div>
                        <p>
                            These new patches have resulted in a huge performance hit on syscall-heavy and interrupt-heavy workloads due to the context switching overheads (TLB flush and Page table switch).
                        </p>
                    <header className="Headers">Spectre</header>
                        <div class="SubHeader">
                            LFENCE
                        </div>
                        <p>
                            LFENCE is a assembly level instruction that ensures the execution ordering of instructions on a machine level. Once a LFENCE instruction is inserted after a branch instruction, 
                            the subsequent instructions will not executed until the branch instruction has been retired. This 
                        </p>
                        <img src= {spectre_miti} className="anime"></img>
                        <div class="SubHeader">
                            Cost of LFENCE
                        </div>
                        <p>
                            LFENCE comes at a cost however, as it impacts the performance of processors negatively.
                            Most modern processors rely on speculative excecution during branch instructions to increaes the performance of their processors.
                            Therefore, LFENCE should be inserted only when <b>necessary</b> to minimise the impact on performance, in situations such as bounds checking.
                        </p>
                </div>
            </div>
        </div>
    )
}


}


export default Mitigations