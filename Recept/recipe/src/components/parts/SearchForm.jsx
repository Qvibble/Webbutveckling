import React from "react";
import {Link, withRouter} from "react-router-dom";

class SearchForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            form: ""
        }

        this.getRecipes = this.getRecipes.bind(this);
    }

    async getRecipes(event){
        event.preventDefault();

        //Om sökfältet inte är tomt
        if(this.state.form.searchBar.value !== ""){
            let searchTerm = this.state.form.searchBar.value.trim();
            console.log("saeragbc temer: " + searchTerm);
            await fetch("http://localhost:8080/Recipe/api/recipe/search", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "SearchTerm": searchTerm
                }
            }).then((response) => {
                //Om det gick att söka
                if(response.ok){
                    //Sparar det användaren sökte på
                    sessionStorage.setItem("searchTerm", searchTerm);
                    window.location.replace("/search");

                    /* Om man inte redan befinner sök på sök sidan, gå dit */
                    //if(window.location.pathname !== "/search"){
                    //}else{
                    //    this.state.form.searchBar.value = null;
                    //}
                }

                return response.json();
            }).then(data =>{
                sessionStorage.setItem("searchedRecipes", JSON.stringify(data));
            }).catch(err => {
                console.error(err);
            });
        }
    }

    componentDidMount(){
        //Sätter referens till formuläret sökfältet ligger i
        this.state.form = document.getElementById("searchForm");
    }

    render(){
        return(
            <form id="searchForm" method="post" onSubmit={this.getRecipes}>
                <input type="text" name="searchBar" placeholder="Namn på recept..."></input>
                <input type="submit" name="submitBtn" value="Sök"/>
            </form>
        );
    }
}

export default withRouter(SearchForm);