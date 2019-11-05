import React from 'react';
import Sidebar from './Sidebar';
import posed from "react-pose";
import Meltdownpic from './resources/meltdown.png';
import caching from "./resources/Meltdown-caching.gif"
import probing from "./resources/Meltdown-probing.gif"
import Button from 'react-bootstrap/Button';
const Box = posed.div({
  left: { x: -100  ,y : -100},
  right: { x: 100  ,y : 100}
});

const Text = posed.div({
  left: { x: 0  ,y : -100},
  right: { x: 0  ,y : 100}
});

const phase0 = "This is a short animation on how the meltdown attack works, "
const phase1 = "Notice how the out of order execution executes at almost the same time"
const phase2 = "Notice how the timing for cache retrieval is alot faster than from Main Memory. By timing the retrieval, we can know which array access was from the cache."

class Meltdown extends React.Component{
    render(){
      return(
        <div>
          <div classname="menu-item">
            <Sidebar />
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
        <img src={this.state.anime_src} className="anime" alt="animation_gif"></img>
        <div className="nav_container">
          <div className="nav_button">
            <Button className="nav_buttons"onClick={this.handleBackClick} variant="light" >
              <i class="arrow left"></i>
            </Button>
          </div>
          <div className="Explanation_box">
            <p className="Explanation">{this.state.explanation}</p>
          </div>
          <div className="nav_button">
            <Button className="nav_buttons"onClick={this.handleClick} variant="light" >
              <i class="arrow right"></i>
            </Button>
          </div>
        </div>
      </div>
      
    )
  }

}

class UserMemory extends React.Component{
  state = {pose: 'left'}
  handleMouseEnter = () => this.setState({
    pose: this.state.pose === 'left' ? 'right' : 'left'
  })
  render(){
    return(
      <div>
        <Box className="User_memory" >
          <Box className="arraybox" pose = {this.state.pose} onMouseEnter={this.handleMouseEnter}>
            <text>90</text>
          </Box>
          <Array />
        </Box>
      </div>
    )
  }
}

class Array extends React.Component{
    render(){
      return(
        <div>
          <Box className="arraybox"  >
            <text >69</text>
          </Box>
          <Box className="arraybox" >
            <text >29</text>
          </Box>
          <Box className="arraybox" >
            <text >39</text>
          </Box>
          <Box className="arraybox" >
            <text >62</text>
          </Box>
        </div>
      )
    }

}

class Separation extends React.Component{
    render(){
      return(
        <Box className="separation_block"></Box>
      )

    }
}

class KernelMemory extends React.Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        <Box className="Kernel_memory" >
          <Text pose = {this.props.pose}>Secret</Text>
        </Box>
      </div>
    )
    

  }
}

export default Meltdown

