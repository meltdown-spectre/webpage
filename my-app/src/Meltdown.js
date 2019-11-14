import React from 'react';
import Sidebar from './Sidebar';
import posed from "react-pose";
import Meltdownpic from './resources/meltdown.png';
import caching from "./resources/Meltdown-slides-caching.gif"
import probing from "./resources/Meltdown-slides-probing.gif"
import Button from 'react-bootstrap/Button';


const phase0 = "This is a short animation on how the meltdown attack works, "
const phase1 = "Notice how the out of order execution executes at almost the same time"
const phase2 = "Notice how the timing for cache retrieval is alot faster than from Main Memory therefore we know which array access was from the cache."

class Meltdown extends React.Component{
    render(){
      return(
        <div>
          <div classname="menu-item">
            <Sidebar />
          </div>
            <div class = "Letters">
                <header className="Headers">Meltdown</header>
                <p>Discovered and reported independently by 3 teams in 2018, Meltdown is a 
                  hardware issue found in some processors (Intels, ARMs and IBM POWERs) which 
                  overcomes memory isolation, by exploiting a race condition between memory 
                  read and privilege check. This opens up the possibility for a program to read 
                  memory you have no privilege to access. For example, a user process that is vulnerable 
                  to Meltdown will be able to access the kernel memory, which should be impossible under 
                  normal circumstances.<br></br>
                  <br></br>
                  Meltdown is not an exploitation of software vulnerability. Instead, it is an exploitation 
                  of side-channel information that is available on most modern processors. An attacker 
                  with access to the vulnerable processor will be able to exploit the information in it by 
                  running a malicious program to retrieve a dump of the entire kernel address space and mapped 
                  physical memory. <br></br>
                  <br></br>
                  So why is Meltdown dangerous? The kernel stores encryption keys, passwords or even physical 
                  pages of other processes. These sensitive data will be compromised due to Meltdown and other 
                  users could potentially use these sensitive information to cause harm to others or to the user 
                  himself.<br></br>
                  <div class="SubHeader">
                    Description
                  </div>
                  The full Meltdown attack consists of 2 building blocks:
                  Speculatively executing instructions that should never occur in the executed path.
                  Monitoring the effect of the speculatively executed instructions on the architectural state to 
                  leak the secret. In the first block, these instructions are known as transient instructions and 
                  they occur almost all the time. To maximise performance, the CPU will constantly execute instructions
                  ahead of the current instruction. As such, this brings about a side channel vulnerability if the instructions 
                  executed relies on a secret value. As mentioned previously, kernel memory is not accessible by user processes 
                  and an unprivileged access to it by the process will cause an exception to be thrown. This exception thrown 
                  could be dealt with using exception handling or suppression. <br></br>
                  A malicious attacker can handle the exception by installing a signal handler to catch a specific exception 
                  and runs his code to prevent the process from terminating.<br></br>
                  <br></br>
                  In the next segment of the attack, due to the (speculative) execution of the instruction that should not have occurred, 
                  there might be a change in the architectural state such as the state of the cache. This change in state will then be passed 
                  through a covert channel and the attacker will be able to deduce what the leaked secret is.
                  In the next part of the section, we demonstrate a walkthrough of the Meltdown attack.
                  <div class="SubHeader">
                  Walkthrough/Demo
                  </div>
                  In this walkthrough, we split the attack into 2 major parts. The first step of the attack uses speculative execution to 
                  cause microarchitectural changes such as affecting the state of the cache and the second step would be to observe these changes 
                  using a technique called flush+reload. To understand how we are able to retrieve the kernel memory, we will first have to 
                  understand the flush+reload technique.
                  <div class="SubHeader">
                  Flush + Reload technique
                  </div>
                  The flush+reload technique allows users to detect if a memory location has been accessed within a period of time. 
                  The general idea behind this technique is to observe the differences in the time taken for retrieval of data when a 
                  memory location is accessed the first time and its subsequent accesses. Using this technique, we can observe that 
                  memory access time is slow initially but becomes much faster in the subsequent access of the same memory location. 
                  This difference in timings between the first access and subsequent accesses is due to the caching of the data. 
                  As the first memory access resulted in a cache miss, the process would have to read the data from the physical 
                  memory which causes the process to incur additional overhead cost. After retrieving the data from the physical memory, 
                  the data is then stored in the cache for subsequent access. As a result, subsequent access to that same memory 
                  location resulted in a cache hit and the time to retrieve the data from the memory is greatly reduced.
                  Using the reasoning above, we will be able to detect if a process uses a memory address. Below describes the detection process:<br></br>
                  1. Suppose we would like to detect if process C accesses/uses the memory location A. <br></br>
                  2. First, we will initialise the cache by flushing A from the cache. We are able to flush the cache using the clflush instruction.
                  <div class = "code">
                    _mm_clflush(Address[A])
                  </div>
                  3. Next, we will run the process C. <br></br>
                  4. After C completes its execution, we will access A separately and measure how long it takes to retrieve its value. <br></br>
                  5. This can be done by counting the number of clock cycles it takes to access the memory. We are able to measure the access 
                  time accurately by finding the difference in time using the rdtsc (read time-stamp counter) instruction. <br></br>
                  <div class="code">
                    time1 = __rdtscp(&A) <br></br>
                    A    = *addr; // addr: Address of A <br></br>
                    time2 = __rdtscp(&A) - time1;
                  </div>
                  6. A short access time would mean that C had used A during its execution. <br></br>
                  7. On the other hand, a long access time would mean that A is not in the cache. 
                  However, we cannot be certain that C did not use A during its execution as it 
                  is also possible that the data were accessed in a way that caused A to be replaced in the cache. <br></br>
                  8. To determine what a 'short access' and 'long access' means, we will run a few tests using 
                  rdtsc instruction to find out what is the average number of cycles to access cached memory and 
                  the number of cycles to access uncached memory. <br></br>
                  9. After retrieving the average number of cycles, we will set a 'threshold' value for cache access 
                  cycles, which separates a 'short' and 'long' access. 
                  <div class="SubHeader">
                    Speculative execution
                  </div>
                  Moving on, we will observe how speculative execution can cause microarchitectural changes. 
                  As mentioned in Section 2, speculative execution is an optimization that modern CPUs use 
                  to maximize the usage of the CPU.<br></br>
                  Consider the following piece of code that is executed by a user-level process: <br></br>
                  <div class="code">
                    void meltdown_asm(unsigned long kernel_data_addr)&#123; <br></br>
                    char kernel_data = 0;<br></br>
                    kernel_data = *(char*)kernel_data_addr; // Line 1. Illegal access, no permission <br></br>
                    array[kernel_data*4096+DELTA] += 1; // Line 2. Speculatively executed <br></br>
                    &#125;
                  </div>
                  Code 2: Meltdown code <br></br>
                  <br></br>
                  When the CPU executes line 1, it fetches the data as well as check the access rights of the process 
                  in parallel. If the data returns before the access rights check is complete, the CPU would have all 
                  it needs to execute line 2. Therefore, instead of idling, the processor will speculatively execute 
                  line 2. As such, line 2 will access a memory location based on the data that was read in line 1.<br></br>
                  Once the access right check returns, the CPU realizes that this is an illegal memory access and discards 
                  the effects of line 1. This is done by setting a status bit in the reorder buffer to indicate a fault, and 
                  when the load data operation commits, the pipeline is flushed and an exception is thrown.<br></br>
                  However, although the pipeline is flushed, the cache had already been affected. The kernel_data is of 
                  type char and has 256 values. Hence, one of the 256 possible cache lines would have already been accessed. 
                  This effect can be observed by the flush+reload technique and hence, we are able to determine the value 
                  of kernel_data by determining which cache line has been accessed. <br></br>
                  Code 2 shows how we are able to determine the value of kernel_data. We first check each of the 256 cache 
                  lines and we are able to deduce that the cache line that has a short access time was accessed. 
                  The accessed cache line was chosen based on the value of kernel_data. Hence, we will be able to determine 
                  what that value was.

                  <div class="code">
                    void reloadSideChannel()<br></br>
                    &#123; <br></br>
                    int junk=0; <br></br>
                    register uint64_t time1, time2; <br></br>
                    volatile uint8_t *addr; <br></br>
                    int i; <br></br>
                    for&#40;i=0; i&#60;256;i++&#41;&#123; // check which of the 256 cache lines were accessed <br></br>
                        addr = &array[i*4096 + DELTA]; <br></br>
                        time1 = __rdtscp(&junk); // calculating the differences in clock cycles <br></br>
                        junk = *addr; <br></br>
                        time2 = __rdtscp(&junk) - time1; <br></br>
                        if &#40;time2 &#60;&#61; CACHE_HIT_THRESHOLD&#41;&#123;  <br></br>
                    printf&#40;"array[%d*4096 + %d] is in cache.\n", i, DELTA&#41;;<br></br>
                &#125;
                  </div>
                  Code 3
                  <br></br>
                  <br></br>
                  We combine these two parts to get the meltdown attack. In order to demonstrate this attack, 
                  we planted a secret value inside the kernel using procfs. We will then read the planted secret 
                  from a user-level process using the same techniques above. <br></br>
                      </p>
            </div>
            <Explanation />
        </div>
      )
    }
}
class Explanation extends React.Component{
  constructor(){
      super();
      this.phase0 = phase0;
      this.phase1 = phase1;
      this.phase2 = phase2;
      this.phase0ani = Meltdownpic;
      this.phase1ani = caching;
      this.phase2ani = probing;
      this.state = {
        anime_src : this.phase0ani,
        exState : 0,
        explanation : this.phase0,
        nextButtonState : "block",
        backButtonState : "None"
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleBackClick = this.handleBackClick.bind(this)
  }
  handleClick(){
    let newState = ""
    let newExplanation = ""
    let newGif = ""
    let newNextButtonState = ""
    let newBackButtonState = ""
    this.setState(prevState =>{
      switch (prevState.exState){
        case 0 : 
           newState = 1
           newExplanation = this.phase1
           newGif = this.phase1ani
           newNextButtonState = "block"
           newBackButtonState = "block"
           break;
        case 1 : 
            newState = 2
            newExplanation = this.phase2
            newGif = this.phase2ani 
            newNextButtonState = "none"
            newBackButtonState = "block"
            break;   
        case 2 : 
            newState = 2
            newExplanation = this.phase2
            newGif = this.phase2ani 
            newNextButtonState = "none"
            newBackButtonState = "block"
            break;  
      }
      
      return {
        exState : newState,
        explanation : newExplanation,
        anime_src : newGif,
        nextButtonState :  newNextButtonState,
        backButtonState : newBackButtonState
      }
    })
  }
  handleBackClick(){
    let newState = ""
    let newExplanation = ""
    let newGif = ""
    let newNextButtonState = ""
    let newBackButtonState = ""
    this.setState(prevState =>{
      switch (prevState.exState){
        case 0 : 
          newState = 0
          newExplanation = this.phase0
          newGif = this.phase0ani 
          newBackButtonState = "none"
          newNextButtonState = "block"
          break;
        case 1 : 
          newState = 0
          newExplanation = this.phase0
          newGif = this.phase0ani 
          newBackButtonState = "none"
          newNextButtonState = "block"
          break;
        case 2 : 
          newState = 1
          newExplanation = this.phase1
          newGif = this.phase1ani
          newBackButtonState = "block"
          newNextButtonState = "block"
          break;       
      }
      
      return {
        exState : newState,
        explanation : newExplanation,
        anime_src : newGif,
        nextButtonState :  newNextButtonState,
        backButtonState : newBackButtonState

      }
    })
  }
  render(){
    return(
      <div className="anime_container">
        <div className="nav_container">
          <div className="nav_button">
            <Button className="nav_buttons"onClick={this.handleBackClick} variant="light" >
              <i class="arrow left"></i>
            </Button>
          </div>
          <div className="Explanation_box">
            <p >{this.state.explanation}</p>
          </div>
          <div className="nav_button">
            <Button className="nav_buttons"onClick={this.handleClick} variant="light" >
              <i class="arrow right"></i>
            </Button>
          </div>
        </div>
        <img src={this.state.anime_src} className="MeltdownAnime" alt="animation_gif"></img>
      </div>
      
    )
  }

}


export default Meltdown