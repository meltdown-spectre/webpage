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
          <p>{intro}</p>
        </Container>
      </div>
    );
  }
}

class Title extends React.Component{
  render(){
    return(
      <div>
        <header class="Headers"> Meltdown Spectre Attack</header>
        <p>The purpose of this tool is to educate meltdown/spectre</p>
      
      </div>
    )
  }
}


export default App;
