import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Register";
import Login from "./components/Login";
import {Navigationbar} from './components/Navigationbar';
import Booking from './components/Booking';
import Admin from './components/Admin';
import Cards from './components/cards/Cards';
import Grid from './components/Grid';
import "./App.css";
//import MoviesList from './components/MovieList/MovieList';
class App extends Component{
  render()
  {
    return(
      <div className="App">
        <Navigationbar/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/movie" component={Cards}/>
            <Route exact path="/booking" component={Booking}/>
            <Route exact path="/seat" component={Grid}/>
            <Route exact path="/admin" component={Admin}/>
          </Switch>  
       </BrowserRouter>
      </div>
      
    );
  }


}
export default App;