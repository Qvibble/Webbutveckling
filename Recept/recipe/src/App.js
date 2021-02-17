import './main.scss';
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import Create from "./components/Create";
import Recipe from "./components/Recipe";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Home/>}/>
        <Route path="/" exact component={() => <Search/>}/>
        <Route path="/" exact component={() => <Login/>}/>
        <Route path="/" exact component={() => <Register/>}/>
        <Route path="/" exact component={() => <User/>}/>
        <Route path="/" exact component={() => <Create/>}/>
        <Route path="/" exact component={() => <Recipe/>}/>
      </Switch>

    </Router>
  );
}

export default App;
