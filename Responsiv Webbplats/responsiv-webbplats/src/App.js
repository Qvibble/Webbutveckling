import testImg from"../src/image.png";
import './main.scss';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Second from "./components/Second";
import Third from "./components/Third";
import Start from "./components/Start";

//Main article text
var imgText = "Det är ett välkänt faktum att läsare distraheras av läsbar text på en sida när man skall studera layouten. Poängen med Lorem Ipsum är att det ger ett normalt ordflöde, till skillnad från Text här, Text här, och ger intryck av att vara läsbar text. Många publiseringprogram och webbutvecklare använder Lorem Ipsum som test-text, och en sökning efter Lorem Ipsum avslöjar många webbsidor under uteckling. Olika versioner har dykt upp under åren, ibland av olyckshändelse, ibland med flit (mer eller mindre humoristiska).";
//Ad/side text
var asideText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function App() {//id is saved in sessionStorage to save what page the user is on
  return (
    <div className="App" id={sessionStorage.getItem("id")}>
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Header title="Min Webbplats - Startsida"/>}/>
                <Route path="/2" exact component={() => <Header title="Min Webbplats - Sida 2"/>}/>
                <Route path="/3" exact component={() => <Header title="Min Webbplats - Sida 3"/>}/>
            </Switch>
            <Nav/>
            <Switch>
                <Route path="/" exact component={() => <Start text={imgText} img={testImg}/>}/>
                <Route path="/2" exact component={() => <Second/>}/>
                <Route path="/3" exact component={() => <Third text={imgText} aside={asideText}/>}/>
            </Switch>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
