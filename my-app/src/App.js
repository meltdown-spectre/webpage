import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Meltdown from "./Meltdown"
import Spectre from "./Spectre"
import Sidebar from './Sidebar';
import Cache from './Cache';
import VM from './VM';
import OutOfOrder from './OutOfOrder';
import Meltdownpic from './resources/meltdown.png';
import Spectrepic from './resources/spectre.png';

class App extends React.Component{
  render(){
    return (
      <Container>
        <Router>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/Meltdown" component={Meltdown}></Route>
          <Route exact path="/Spectre" component={Spectre}></Route>
          <Route exact path="/Cache" component={Cache}></Route>
          <Route exact path="/VM" component={VM}></Route>
          <Route exact path="/OutOfOrder" component={OutOfOrder}></Route>
        </Router>
      </Container>
    );
  }
}

class Main extends React.Component{
  render(){
    const intro = "Introduction for meltdown spectre."
    return (
      <div>
        <Container>
          <Sidebar />
          <Title />
          <Body />
          <End />
        </Container>
      </div>
    );
  }
}

class Title extends React.Component{
  render(){
    return(
      <div class ="title-container">
        <header class="Headers"> Visualizing Meltdown and Spectre </header>
        <p>
          Meltdown and Spectre were attacks that exploited critical vulnerabilities in the way modern processors work.
          Exploiting something known as
        </p>
        <div class = "SubHeaderHome">
          The Motivation
        </div>
        <p class = "purpose">
          Understanding the technical details of Meltdown and Spectre are not trivial. 
          The <a href ="https://meltdownattack.com/meltdown.pdf">meltdown</a> and <a href ="https://spectreattack.com/spectre.pdf">spectre</a> papers explore concepts such as micro-operation and micro-architecture that may appear very daunting to the average reader.
          The team behind this webpage application aims to simplify the technical details of Meltdown and Spectre attack using visualization.
          Without over complicating the learning process with excessive technical jargon, the team incoporates 
          and discusses the only most essential components of the attacks. 
        </p>
        <div class = "SubHeaderHome">
          What To Expect
        </div>
        <p class ="expectation">
          Readers can expect to at least obtain a very basic understanding of how the attacks are conducted.
          Although simplified, readers are expected at least to have basic knowledge of how computers work to able to comprehend the topics discussed.
          Else, readers can start on with simple topics such as:
          <ol class = "to_start">
            <li><a href="https://en.wikipedia.org/wiki/Computer_memory">What is computer memory?</a></li>
            <li><a href="https://simple.wikipedia.org/wiki/Instruction_(computer_science)">What are computer instructions?</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Control_flow">What is control flow?</a></li>
          </ol>
        </p>
      </div>
    )
  }
}

class Body extends React.Component{
  render(){
    return(
      <div>
        <div class = "SubHeaderHome">
          Just a sneak peak..
        </div>
        <div class = "Meltdown_column">
          <img class="meltdown_logo" src = {Meltdownpic} alt="meltdown_pic" ></img>
          <h1 class = "Meltdown_header">Meltdown</h1>
          <ul class = "meltdown_summary">
            <li>Melts the isolation between users application and operating system</li>
            <li>Uses intel priviledge execution to perform speculative execution</li>
            <li>Affects Intel, Apple</li>
          </ul>
        </div>
        <div class = "Spectre_column">
          <img class ="spectre_logo" src = {Spectrepic} alt="spectre_pic"></img>
          <h1 class = "Spectre_header">Spectre</h1>
          <ul class = "spectre_summary">
            <li>Breaks the isolation between different applications</li>
            <li>Uses Branch prediction to perform speculative execution</li>
            <li>Affects Intel, Apple, ARM, AMD</li>
          </ul>
        </div>
      </div>
    )
  }
}
class End extends React.Component{
  render(){
    return(
      <div class = "end-container">
        <header class="SubHeaderHome">
          Before you start
        </header>
        <p>
          Topics like Out of Order Execution, Cache, Virtual memory are essential components of the attack.
          If you are well-read with these topics, you can proceed to <a href="/Meltdown">Meltdown</a> or <a href="/Spectre">Spectre</a> to see how it all comes together.
          If not, it is highly advisable to use the navigation bar on the left to explore these topics before jumping into the attacks.
        </p>
      </div>
    )
  }
}

export default App;
