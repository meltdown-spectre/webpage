import React from 'react';
import Sidebar from './Sidebar';
import branchP from "./resources/Spectre-slides-BP.gif"
import caching from "./resources/Spectre-slides-caching.gif"
import probing from "./resources/Spectre-slides-probing.gif"
import spectreanime from "./resources/SpectreAnimation.png"
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Switch, Link} from 'react-router-dom';

const phase0 = "This is a short animation on how the spectre attack works. Press Right arrow to  continue."
const phase1 = "Branch prediction"
const phase2 = "Notice how the out of order execution executes at almost the same time"
const phase3 = "Notice how the timing for cache retrieval is alot faster than from Main Memory. By timing the retrieval, we can know which array access was from the cache."
class Spectre extends React.Component {
  render() {
    return (
      <div className="">
        <div className="menu-item">
          <Sidebar />
        </div>
        <div className="text-wrapper">
          <header className="Headers">Spectre</header>
          <p>While Meltdown exploits privilege escalation, Spectre does not. 
            Instead, Spectre requires tailoring to the user process’s software environment. 
            This attack generally affects CPUs that support speculative execution. 
            Spectre attacks mislead processors to undergo speculative execution 
            that should not have been executed under normal circumstances. Now, let us take a 
            closer look at it below.</p>
          <div className="SubHeader">
           <p>Description</p>
          </div>
          <p>Unauthorised copying, transferring and retrieving of data from a computer or a 
          server is known as data exfiltration. Spectre attacks combines both speculative 
          execution and data exfiltration to violate memory isolation. In general, the 
          attack starts with the insertion of a malicious instructions within the process address 
          space. These instructions, when executed, leaks the contents of the user’s memory/registers 
          through a covert channel. The subsequent step would involve the attacker tricking 
          the CPU into speculatively execute the malicious instructions. Once the sequence of instructions 
          is executed, the attacker will deduce the sensitive data that was received in the covert channel.<br></br>
          <br></br>
          Although this speculative execution will be reverted back eventually, the effect of this execution 
          is similar to that of Meltdown. There will be microarchitectural changes made to components such 
          as the cache and the leaked data can then be retrieved using the Flush + Reload method mentioned in the <a href="/Meltdown">Meltdown</a>. <br></br>
          <br></br>
          Now that we have described how Spectre attacks work in general, let us go deeper into the more 
          common variants of Spectre: Variant 1, Variant 2 and Variant 4. <br></br>
          </p>
          <div className="SubHeader">
            <p>Spectre Variant 1 - Bounds Check Bypass</p>
          </div>
          <p>This vulnerability allows attackers to use the speculative execution of conditional branch instructions to 
          leak information that are usually not accessible to them. Attackers take advantage of the “confused deputy” 
          code that is used for bounds checking, like checking if the index is inbound for an array. Speculative 
          execution of the memory access to out of bounds memory can leak information to the attackers. <br></br>
          <br></br>
          This variant involves the attacker mistraining the branch predictor into mispredicting the branch.</p>
           <div className="code">
            if (input &#60; array_size) &#123;   #Checks if input in not out of bounds <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;val = data[array[input]];  #Read data<br></br>
            &#125;
          </div>
          <p>Code 1: Vulnerable Code.<br></br></p><br></br>
          <p>Using the example given above, the attack can be split into 2 phases: Mistraining phase and 
          Exploiting phase. In the mistraining phase, the attacker will constantly pass a value within 
          the bounds as the input. This will train the branch predictor to expect the “if” result to be true. 
          Subsequently, in the exploit phase, the attacker will input a value that is out of bounds. 
          Since the predictor expects the condition to be true, the process will execute the instruction 
          within the clause and retrieve the “val” from an array which has a value out of its bounds. The 
          value read will be stored and remain in the cache even after the condition results in false and the 
          execution is reverted. <br></br>
          <br></br>
          The attacker will then be able to determine the leaked memory using the flush + reload technique.</p>
          <div className="SubHeader">
              <p>Spectre Variant 2 - Branch Target Injection</p>
          </div>
          <p>This vulnerability exploits the indirect branch predictors to direct instructions that are 
          speculatively executed after an indirect branch instruction to the gadget. A gadget is a sequence 
          of carefully chosen instructions that are in the processors’ memory. Attackers can train the indirect 
          branch predictors to speculatively execute malicious code to leak information to them. 
          Instead of training the branch prediction like in variant 1, the attacker trains the Branch Target 
          Buffer (BTB) into mispredicting a branch from an indirect branch instruction to the address of the 
          gadget. This will result in the gadget being speculatively executed and the consequences would be 
          similar to that of variant 1. <br></br><br></br>
          To carry out this variant of Spectre attack, the attacker finds the gadget’s virtual address in the 
          user virtual memory and trains the BTB to indirect branch to that address. To train the BTB, the 
          attacker uses his own virtual address space. What actually resides in the attacker’s address space 
          does not matter as long as the virtual address is similar to that of the user’s address. Once the BTB 
          is mistrained to direct indirect branch to that virtual address, the attacker will be able to get a 
          hold of the user’s leaked data.</p>
          <div className="SubHeader">
              <p>Spectre Variant 4 - Speculative Store Bypass</p>
          </div>
          <p>This vulnerability uses the memory dependence prediction feature of modern processors which can 
          predict the memory address of load and store instructions before their addresses are known. The 
          memory dependence prediction feature allows load and store instructions to speculatively execute 
          before their addresses are known. Attackers can create “confused deputy” code to speculatively execute 
          load instructions with memory addresses to sensitive data and leak information to them.<br></br>
          This exploit involves 3 main steps: <br></br>
          1. Slowly storing the data at the memory location. <br></br>
          2. Quickly load that data from that location. <br></br>
          3. Make changes to the cache. <br></br>
          <br></br>
          For this attack to work, the attacker would have to make the storing of data depend on the previous 
          instruction. As a result, the processor would have to wait before the data could be stored and the 
          loading of the data will be speculatively executed. The data that is loaded will be stored in the 
          cache. Once the processor realise that it is storing and loading from the same address, the previous 
          value loaded will be reverted and the new value is loaded. However, there were already changes made to 
          the cache and the leaked data could be retrieved in a similar way as mentioned above. </p>
          <div className="SubHeader">
              <p>Walkthrough/Demo</p>
          </div>
          <p>As this attack also relies on the changes in the cache, we will make use of the flush + reload 
          technique previously used in the Meltdown Section. In addition, we will also use the same method 
          of checking the values in the cache. In this section, we will be demonstrating a Spectre 
          variant 1 attack. <br></br>
          Suppose the victim has the following code in their program. <br></br></p>
          <div className="code">
              if (x &#60; array_size) &#123; <br></br>
	            &nbsp;&nbsp;&nbsp;&nbsp;return array[x];<br></br>
              &#125;else&#123;<br></br>
	              &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br></br>
                &#125;
          </div>
          <p>Code 2: Victim's Code.<br></br></p><br></br>
          <p>We will first train the branch predictor to predict that the if-condition will always 
          return true. This can be done by consistently looping a value that is within the size of 
          the array as demonstrated below.<br></br></p>
            <div className="code"> 
            for (i = 0; i &#60; 20; i++) &#123; <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;_mm_clflush(& array_size); #flush the values stored in the cache <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;victim_code(i); # contains the victim’s code above. Assuming array_size > 20. <br></br>
              &#125;
            </div>
            <p>Code 3: Attacker's Code to train branch predictor.<br></br></p><br></br>
          <p>Right after the execution of the code above, we can now input any value larger than the array size. 
          For understanding purposes, we will demonstrate this by using the address of the secret itself. 
          However, in actual scenarios, the address of the sensitive data are not known and this retrieval 
          will be done using any values that is larger than the size of the array. <br></br><br></br>
          As the value retrieve is a single variable, we are able to continuously extracted data stored in a 
          contiguous segment of memory by incrementing the value of x. <br></br></p>
          <div className = "code">
          for(int j=0; j&#60;len;j++)&#123; <br></br>
	              &nbsp;&nbsp;&nbsp;&nbsp;for (i=0; i&#60;256; i++) <br></br>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hits[i] = 0; #number of times the character is found in the cache <br></br><br></br>
	          &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i&#60;1000; i++) &#123; <br></br>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spectre_attack(larger_x); # trains the branch predictor and perform attack <br></br>         
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reloadSideChannelImproved(); # same method as Meltdown <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&#125; <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;int max = 0; <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i &#60;256; i++)&#123; <br></br>
		             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(hits[max] &#60;hits[i]) max = i; #find the value with highest number of cache hits <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br></br><br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;printf("Reading secret value at %p = ", (void*)larger_x); <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;printf("The secret value is %c\n", max); <br></br><br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;larger_x++; # increment the out of bound value to retrieve the next character <br></br>
            &#125;
          </div>
          <p>Code 4: Retrieving the secret Code.<br></br></p><br></br>
          <p>By combining the all the code above, you will be able to perform the Spectre attack. You can download the Spectre attack file 
          <Link to="/SpectreAttack.c" target="_blank" download> here.</Link><br></br><br></br>
          Once you compile and run the code, if you see the secret value printed out on your terminal, CONGRATULATIONS!! You have successfully performed a Spectre Variant 1 attack on the kernel memory. <br></br>
          If you did not manage to see the values of the secret, try compiling and run again. No worries! The secret will be yours soon! <br></br><br></br>
          We have included an animation of the Spectre vulnerabilities and how it works below. Do take a look at it to understand more about this vulnerability. <br></br><br></br>
          </p>
        <Explanation />
        </div>
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
      this.phase3 = phase3;
      this.phase0ani = spectreanime;
      this.phase1ani = branchP;
      this.phase2ani = caching;
      this.phase3ani = probing;
      this.state = {
        exState : 0,
        explanation : this.phase0,
        anime_src : this.phase0ani,
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
            newState = 3
            newExplanation = this.phase3
            newGif = this.phase3ani 
            newNextButtonState = "none"
            newBackButtonState = "block"
            break;  
        default : 
            newState = 3
            newExplanation = this.phase3
            newGif = this.phase3ani 
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
          newGif = null
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
        default : 
          newState = 2
          newExplanation = this.phase2
          newGif = this.phase2ani
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
          <div className="nav_button_left">
            <Button className="nav_buttons"onClick={this.handleBackClick} variant="light" >
              <i className="arrow left"></i>
            </Button>
          </div>
          <div className="Explanation_box">
            <p >{this.state.explanation}</p>
          </div>
          <div className="nav_button">
            <Button className="nav_buttons"onClick={this.handleClick} variant="light" >
              <i className="arrow right"></i>
            </Button>
          </div>
        </div>
        <img src={this.state.anime_src} className="SpectreAnime" alt=""></img>
      </div>
      
    )
  }

}

export default Spectre