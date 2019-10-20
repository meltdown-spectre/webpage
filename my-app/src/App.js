import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Meltdown from "./Meltdown"
import Spectre from "./Spectre"

class App extends React.Component{
  render(){
    const intro = "Introduction for meltdown spectre."
    const before = "Before we start these concepts are important.."
    return (
      <Container>
        <Router>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/Meltdown" component={Meltdown}></Route>
          <Route exact path="/Spectre" component={Spectre}></Route>
        </Router>
      </Container>
    );
  }
}

class Main extends React.Component{
  render(){
    const intro = "Introduction for meltdown spectre."
    const before = "Before we start these concepts are important.."
    return (
      <Container>
        <Title />
        <p>{intro}</p>
        <p>{before}</p>
        <Cache/>
        <VM/>
        <OutOfOrder/>
        <Goto />
      </Container>
    );
  }
}

class Title extends React.Component{
  render(){
    return(
      <header>
        <h1>Meltdown Spectre Attack</h1>
        <p>The purpose of this tool is to educate meltdown/spectre</p>
      </header>
    )
  }
}

class Cache extends React.Component{
  render(){
    return(
      <div>
        <header className="Headers">Cache</header>
        <p>This section explains cache</p>
      </div>
    )
  }
}
class VM extends React.Component{
  render(){
    return(
      <div>
        <header className="Headers">Virtual Memory</header>
        <p>This section explains VM</p>
      </div>
    )
  }
}

class OutOfOrder extends React.Component{
  render(){
    return(
      <div>
        <header className="Headers">Out of Order Execution</header>
        <p>This section explains Out of Order Execution</p>
      </div>
    )
  }
}

class Goto extends React.Component{
  render(){
    return(
      <div>
        <header className="Headers">Now that you are ready</header>
        <p>Explore it</p>
        <Link to="/Meltdown" className="btn btn-primary">Meltdown</Link>
        <Link to="/Spectre" className="btn btn-primary">Spectre</Link>
      </div>
    )
  }
}

export default App;
