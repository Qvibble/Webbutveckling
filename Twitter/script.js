var loginForm;
var searchForm;

window.onload = init;

function init(){
    for(let i = 0; i < 5; i++){
        createPosts(i);
    }
}

function createPosts(nr){
    let article = document.getElementById("art");  //Referens till article
    let section = document.createElement("section");  //Skapar section som inläggen ska ligga i

    section.setAttribute("id", "sec" + nr);  //Sätter id på sections 
    article.appendChild(section);  //Lägger till section i article
}

function login(){

}

function createUser(){


    fetch("http://localhost:8080/Twitter/api/user", {
            method: "POST",
            mode: 'cors',
            headers: {  
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(userData)        
        })
        .then((response) => {
            console.log(response);
    })
}