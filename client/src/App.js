//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Home/LandingPage/LandingPage'
import Home from './components/Home/SearchBar/Home'
import Details from './components/Details/Details'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          {/* <Route path="/dogs" component={CreateDog} /> */}
          <Route path='/details/:id' component={Details} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
