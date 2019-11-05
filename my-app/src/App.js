import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import posed, { PoseGroup } from 'react-pose';
import { Router, Link, Location } from '@reach/router';
import Meltdown from "./Meltdown"
import Spectre from "./Spectre"
import Sidebar from './Sidebar';
import Cache from './Cache';
import VM from './VM';
import OutOfOrder from './OutOfOrder';
import Meltdownpic from './resources/meltdown.png';
import Spectrepic from './resources/spectre.png';


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const newContainer = posed.div({
  enter: { staggerChildren: 50 }
});

const P = posed.p({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

const Img = posed.img({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
})

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

class App extends React.Component{
  render(){
    return (
      <Container>
        <PosedRouter>
          <Main path="/" />
          <Cache path="/Cache" />
          <VM path="/VM"/>
          <OutOfOrder path="/OutOfOrder"/>
          <Spectre path="/Spectre"/>
          <Meltdown path="/Meltdown"/>
        </PosedRouter>
      </Container>
    );
  }
}

class Main extends React.Component{
  render(){
    return (
      <div>
        <newContainer>
          <Sidebar />
          <Title />
          <Body />
          <End />
        </newContainer>
      </div>
    );
  }
}

class Title extends React.Component{
  render(){
    return(
      <div class ="title-container">
        <header class="Headers"> Visualizing Meltdown and Spectre </header>
        <P>
          Meltdown and Spectre were attacks that exploited critical vulnerabilities in the way modern processors work.
          Exploiting something known as
        </P>
        <div class = "SubHeaderHome">
          The Motivation
        </div>
        <P class = "purpose">
          Understanding the technical details of Meltdown and Spectre are not trivial. 
          The <a href ="https://meltdownattack.com/meltdown.pdf">meltdown</a> and <a href ="https://spectreattack.com/spectre.pdf">spectre</a> papers explore concepts such as micro-operation and micro-architecture that may appear very daunting to the average reader.
          The team behind this webpage application aims to simplify the technical details of Meltdown and Spectre attack using visualization.
          Without over complicating the learning process with excessive technical jargon, the team incoporates 
          and discusses the only most essential components of the attacks. 
        </P>
        <div class = "SubHeaderHome">
          What To Expect
        </div>
        <P class ="expectation">
          Readers can expect to at least obtain a very basic understanding of how the attacks are conducted.
          Although simplified, readers are expected at least to have basic knowledge of how computers work to able to comprehend the topics discussed.
          Else, readers can start on with simple topics such as:
          <ol class = "to_start">
            <li><a href="https://en.wikipedia.org/wiki/Computer_memory">What is computer memory?</a></li>
            <li><a href="https://simple.wikipedia.org/wiki/Instruction_(computer_science)">What are computer instructions?</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Control_flow">What is control flow?</a></li>
          </ol>
        </P>
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
          <Img class="meltdown_logo" src = {Meltdownpic} alt="meltdown_pic" ></Img>
          <h1 class = "Meltdown_header">Meltdown</h1>
          <ul class = "meltdown_summary">
            <li>Melts the isolation between users application and operating system</li>
            <li>Uses intel priviledge execution to perform speculative execution</li>
            <li>Affects Intel, Apple</li>
          </ul>
        </div>
        <div class = "Spectre_column">
          <Img class ="spectre_logo" src = {Spectrepic} alt="spectre_pic"></Img>
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
        <P>
          Topics like Out of Order Execution, Cache, Virtual memory are essential components of the attack.
          If you are well-read with these topics, you can proceed to <a href="/Meltdown">Meltdown</a> or <a href="/Spectre">Spectre</a> to see how it all comes together.
          If not, it is highly advisable to use the navigation bar on the left to explore these topics before jumping into the attacks.
        </P>
      </div>
    )
  }
}

export default App;
