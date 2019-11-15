import React from 'react';
import Sidebar from './Sidebar';


class OutOfOrder extends React.Component {
    render() {
        return (
            <div>
                <div className="menu-item">
                    <Sidebar />
                </div>
            <div className="text-wrapper">
                <header className="Headers">Out of Order Execution</header>
                    <p>Out of order execution is a paradigm used in most CPUs nowadays where instructions 
                    are dynamically scheduled for the processor. They are executed by considering the availability
                    of input data and execution units rather than the original order in the program. Therefore, 
                    the CPU reduces the waste of instruction cycles by waiting for resources or other calculations.</p>
                <div className="SubHeader">
                    <p>In order execution</p>
                </div>
                    <p>Older CPUs worked with in order execution where all instructions got executed one by one with
                    the following partial steps. <br></br>
                    1. Loading instruction (instruction fetch)<br></br>
                    2. If the operands are available, the instruction is loaded in the respected unit.
                    3. If the operands are not available, the CPU is going to wait until the operands are available.<br></br>
                    4. Execute instruction <br></br>
                    5. The result is written in a register <br></br></p>
                <div className="SubHeader">
                    <p>Out-of-order execution</p>
                </div>
                    <p>The concept has the following steps: <br></br>
                    1. Instruction fetch <br></br>
                    2. Instruction dispatch to a queue. <br></br>
                    3. Instruction waits in the queue until the operands are loaded. It can leave the queue 
                    even before older instruction. <br></br>
                    4. Instruction is issued to the respective unit and executed <br></br>
                    5. Result is also saved in a result queue <br></br>
                    6. Only after all older instructions have their results written back 
                    to the register file, then this result is written back to the register file. 
                    This is called the graduation or retire stage <br></br></p>
                <div className="SubHeader">
                    <p>Dynamic schedule</p>
                </div>
                <p>After the instruction is decoded it is checked for structural and data hazards. Structural hazards
                occur if a functional unit is not available and therefore the instruction has to be stalled.
                Data hazards include the condition if an instruction can't be issued due to missing operands that have
                yet to be calculated.
</p>
            </div>
            </div>
        )
    }
}

export default OutOfOrder;