import testImg from"../src/image.png";
import './main.scss';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Start from "./components/Start";
import Second from "./components/Second";
import Third from "./components/Third";


var imgText = "Det är ett välkänt faktum att läsare distraheras av läsbar text på en sida när man skall studera layouten. Poängen med Lorem Ipsum är att det ger ett normalt ordflöde, till skillnad från Text här, Text här, och ger intryck av att vara läsbar text. Många publiseringprogram och webbutvecklare använder Lorem Ipsum som test-text, och en sökning efter Lorem Ipsum avslöjar många webbsidor under uteckling. Olika versioner har dykt upp under åren, ibland av olyckshändelse, ibland med flit (mer eller mindre humoristiska).";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Header title="Min Webbplats - Startsida"/>}/>
                <Route path="/2" exact component={() => <Header title="Min Webbplats - Sida 2"/>}/>
                <Route path="/3" exact component={() => <Header title="Min Webbplats - Sida 3"/>}/>
            </Switch>
            <Nav/>
            <Switch>
                <Route path="/" exact component={() => <Start text={imgText} img={testImg}/> }/>
                <Route path="/2" exact component={() => <Second text={imgText} img={testImg}/>}/>
                <Route path="/3" exact component={() => <Third text={imgText} img={testImg}/>}/>
            </Switch>
            <Footer/>
        </Router>
    </div>
  );
}
//<Header title="Min Webbplats - Startsida"/>

/*
<main>
    <ImgArticle text={imgText} img={testImg}/>
</main>
<Footer/>
*/
/*

*/

export default App;
