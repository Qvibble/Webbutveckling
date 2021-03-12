import React from "react";
import {Link, withRouter} from "react-router-dom";

class SearchForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            form: ""
        }

        this.setSearchTerm = this.setSearchTerm.bind(this);
    }

    setSearchTerm(event){
        event.preventDefault();

        //Sparar det som söks på i session storage
        if(this.state.form.searchBar.value !== ""){
            let searchTerm = this.state.form.searchBar.value.trim();
            sessionStorage.setItem("searchTerm", searchTerm);

            /* Om man inte redan befinner sök på sök sidan, gå dit. Annars töms bara sökfältet*/
            if(window.location.pathname !== "/search"){
                window.location.replace("/search");
            }else{
                this.state.form.searchBar.value = null;
            }
        }
    }
    
    
    
    componentDidMount(){
        //Sätter referens till formuläret sökfältet ligger i
        this.state.form = document.getElementById("searchForm");
        
        //Eventlistener på submit
        this.state.form.addEventListener("submit", this.setSearchTerm);
    }

    render(){
        return(
            <form id="searchForm" method="post">
                <input type="text" name="searchBar" placeholder="Namn på recept..."></input>
                <input type="submit" name="submitBtn" value="Sök"/>
            </form>
        );
    }
}

export default withRouter(SearchForm);