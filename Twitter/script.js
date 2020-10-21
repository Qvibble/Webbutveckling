var postForm; //0 = mobile, 1 = larger
var logInButton = [] //0 = mobile, 1 = larger
var logInForm = [] //0 = mobile, 1 = larger

window.onload = init;

function init(){    
    if(!document.querySelector("body").getAttribute("id")){  //Om första sidan
        logInForm[0] = document.getElementById("mLogInForm");  //Referens till mobil log in form
        logInForm[1] = document.getElementById("lLogInForm");  //Referens till stor skärm log in form

        document.getElementById("mobileLogIn").onclick = logIn; //Logga in knapp mobil
        document.getElementById("largeLogIn").onclick = logIn;  //Logga in knapp stor skärm

        fetchRandomPosts();  //Hämta slumpade inlägg och skriv ut dem på första sidan
    }

    if(document.querySelector("body").getAttribute("id") === "userPage"){  //Om användarsidan (egen sida)
        document.getElementById("mLogOut").onclick = logOut;
        document.getElementById("lLogOut").onclick = logOut;
        
        console.log(JSON.parse(localStorage.getItem("posts")));
        let posts = JSON.parse(localStorage.getItem("posts"));
        let postsLength = Object.keys(posts).length;

        for(let i = 0; i < postsLength; i++){
            createPosts(i, posts[i], localStorage.getItem("username"));
        }

        createLogInMessage;
    }
}

function createLogInMessage(){
    let header = document.querySelector("header");  //Referens till header

    let text = document.createElement("h2");  //Skapar en h2 tagg med välkomstmeddelande
    text.innerHTML = "Welcome, \n" + localStorage.getItem("username");  //Lägger in välkomstmeddelande

    header.appendChild(text);  //Lägger till texten i header
}

function createPosts(nr, content, author){
    let article = document.getElementById("art");  //Referens till article
    
    let section = document.createElement("section");  //Skapar section som inläggen ska ligga i
    let post = document.createElement("p");  //Skapar p element där inlägget kommer ligga
    let user = document.createElement("p");  //Skapar p element där användare kommer ligga

    post.setAttribute("id", "post" + nr);  //Sätter id på p taggen
    post.innerHTML = '"' + content + '"';  //Sätter innehåll på p taggen (inlägget)

    user.setAttribute("id", "user" + nr);  //Sätter id på p taggen
    user.innerHTML = "- " + author;  //Sätter innenhåll på p taggen (användaren)

    section.setAttribute("id", "sec" + nr);  //Sätter id på sections 
    section.appendChild(post);  //Lägget till p taggen (inlägget) i section
    section.appendChild(user);  //Lägger till p taggen (användaren) i section 
    article.appendChild(section);  //Lägger till section i article
}

function logIn(){
    let screenSize = this.name;  //Knappen som klickas på, mobile/large
    let username;  //Namn på användare
    let password;  //Lösenord till användare

    if(screenSize === "mobileLogIn"){
        username = logInForm[0].elements.username.value;  //Hämtar innehåll i användarnamnsfältet när knappen klickas på
        password = logInForm[0].elements.password.value;  //Hämtar innehåll i lösenordsfältet när knappen klickas på     
    }else if(screenSize === "largeLogIn"){
        username = logInForm[1].elements.username.value;  //Hämtar innehåll i användarnamnsfältet när knappen klickas på
        password = logInForm[1].elements.password.value;  //Hämtar innehåll i lösenordsfältet när knappen klickas på
    }

    let hash = btoa(username+":"+password);  //Base64 hashning
    let basic = "Basic " + hash;  //Basic Authorization sträng

    fetch("http://localhost:8080/Twitter/api/user", {
        method: "GET",
        mode: 'cors',
        headers: {  
            'Authorization': basic,
            'Content-Type': 'text/plain'
        },
        }).then((response) => {
            if(!response.ok){  //Ta bort användare, värdelös? flyttas?
                if(!localStorage.getItem("username")  === null){
                    localStorage.removeItem("username");
                }
            }

            return response.json();
        }).then(data => {          
            let posts = {};  //Holds posts from data

            for(let i = 0; i < data.length; i++){
                posts[i] = data[i].post;
            }
            
            localStorage.setItem("username", username);  //Sparar användare
            localStorage.setItem("posts", JSON.stringify(posts));  //Sparar data
            
            location.replace("user.html");
        }).catch(err => {
            console.log(err);
    })
}

function logOut(){
    console.log("wew");
    localStorage.removeItem("username");
    localStorage.removeItem("posts");
    location.replace("index.html");
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

function fetchRandomPosts(){  //Hämtar 5 slumpade inlägg
    fetch("http://localhost:8080/Twitter/api/posts", {
            method: "GET",
            mode: 'cors',
            headers: {  
                'Content-Type': 'text/plain'  //Typ av content
            },
    }).then((response) => {
            return response.json();
    }).then(data => {
        for(let i = 0; i < data.length; i++){
            createPosts(i, data[i].post, data[i].user); //Skapa 5 sections med inlägg
        }
    })
}