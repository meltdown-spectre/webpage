import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Meltdown from "./Meltdown"
import Spectre from "./Spectre"
import Sidebar from './Sidebar';
import Cache from './Cache';
import VM from './VM';
import OutOfOrder from './OutOfOrder';
import Mitigations from './Mitigations'
import Meltdownpic from './resources/meltdown.png';
import Spectrepic from './resources/spectre.png';

class App extends React.Component{
  render(){
    return (
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Router>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/Meltdown" component={Meltdown}></Route>
          <Route exact path="/Spectre" component={Spectre}></Route>
          <Route exact path="/Cache" component={Cache}></Route>
          <Route exact path="/VM" component={VM}></Route>
          <Route exact path="/OutOfOrder" component={OutOfOrder}></Route>
          <Route exact path="/Mitigations" component={Mitigations}></Route>
        </Router>
      </Container>
    );
  }
}

class Main extends React.Component{
  render(){
    return (
      <div>
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sidebar />
          <Title />
        </Container>
      </div>
    );
  }
}

class Title extends React.Component{
  render(){
    return(
    <div className="text-wrapper">
        <header className="Headers"> Visualizing Meltdown and Spectre </header>
        <div className = "SubHeaderHome">
          <p>Overview</p>
        </div>
          <p>Attacks exploit critical vulnerabilities in the way modern processors work which allow other programs to steal sensitive information that is currently processed on the computer.</p>
        <div className = "SubHeaderHome">
          <p>Motivation</p>
        </div>
          <p>Understanding the technical details of Meltdown and Spectre are not trivial. 
          The <a href ="https://meltdownattack.com/meltdown.pdf">meltdown</a> and <a href ="https://spectreattack.com/spectre.pdf">spectre</a> papers explore concepts such as micro-operation and micro-architecture that may appear very daunting to the average reader.
          The team behind this webpage application aims to simplify the technical details of these two vulnerabilities using visualization.
          Without over complicating the learning process with excessive technical jargon, the team incoporates 
          and discusses only the most essential components of the attacks.
          </p>
        <div className = "SubHeaderHome">
          <p>What To Expect</p>
        </div>
        <p>
          Readers can expect to at least obtain a very basic understanding of how the attacks are conducted.
          Although simplified, readers are expected at least to have basic knowledge of how computers work to able to comprehend the topics discussed.
          Else, readers can start on with simple topics such as:</p>
          <ol className = "to_start">
          <p>
            <li><a href="https://en.wikipedia.org/wiki/Computer_memory">What is computer memory?</a></li>
            <li><a href="https://simple.wikipedia.org/wiki/Instruction_(computer_science)">What are computer instructions?</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Control_flow">What is control flow?</a></li>
          </p>
          </ol>
          <div className = "SubHeaderHome">
          <p>Just a sneak peak..</p>
        </div>
        <div className="container">
        <div className = "Meltdown_column">
          <img className="meltdown_logo" src = {Meltdownpic} alt="meltdown_pic" ></img>
          <h1 className = "Meltdown_header">Meltdown</h1>
          <ul className = "meltdown_summary">
            <p><li>Melts the isolation between users application and operating system</li>
            <li>Uses intel priviledge execution to perform speculative execution</li>
            <li>Affects Intel, Apple</li>
            </p>
          </ul>
        </div>
        <div className = "Spectre_column">
          <p><img className ="spectre_logo" src = {Spectrepic} alt="spectre_pic"></img></p>
          <h1 className = "Spectre_header">Spectre</h1>
          <ul className = "spectre_summary">
          <p>
            <li>Breaks the isolation between different applications</li>
            <li>Uses Branch prediction to perform speculative execution</li>
            <li>Affects Intel, Apple, ARM, AMD</li>
            </p>
          </ul>
        </div>
        </div>
        <div>
        <header className="SubHeaderHome">
          <p>Before you start</p>
        </header>
          <p>Topics like Out of Order Execution, Cache, Virtual memory are essential components of the attack.
          If you are well-read with these topics, you can proceed to <a href="/Meltdown">Meltdown</a> or <a href="/Spectre">Spectre</a> to see how it all comes together.
          If not, it is highly advisable to use the navigation bar on the left to explore these topics before jumping into the attacks.
        </p>
        </div>
      </div>
    )
  }
}

export default App;
