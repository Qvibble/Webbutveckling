var logInForm = [] //0 = mobil, 1 = stor skärm

window.onload = init;

function init(){    
    if(!document.querySelector("body").getAttribute("id")){  //Om första sidan
        formSettings(); //Skapar referens till inloggs formulären, kollar om en användare är inloggad, skapar knappar som länkar tillbaka till användarens sida om en användare är inloggad 

        fetchRandomPosts();  //Hämta slumpade inlägg och skriv ut dem på första sidan
    }

    if(document.querySelector("body").getAttribute("id") === "searchPage") {  //Om searchPage (visar sökta personens inlägg)
        formSettings();
    }

    if(document.querySelector("body").getAttribute("id") === "userPage"){  //Om användarsidan (egen sida)
        document.getElementById("mLogOut").onclick = logOut;  //Logga ut knapp mobil, kör logOut function när den klickas på
        document.getElementById("lLogOut").onclick = logOut;  //Logga ut knappa stor skärm, kör logOut function när den klickas på
        
        let posts = JSON.parse(localStorage.getItem("posts"));  //Tar emot den inoggade användarens 5 inlägg i form av en JSON string. Konverterar JSON string till JSON objekt 
        let postsLength = Object.keys(posts).length;  //Sparar längden på posts

        for(let i = 0; i < postsLength; i++){
            createPosts(i, posts[i], localStorage.getItem("username"));  //Skapar inläggen
        }

        createLogInMessage();  //Skapar välkomstmeddelande
    }
}

function formSettings(){
    logInForm[0] = document.getElementById("mLogInForm");  //Referens till mobil log in form
    logInForm[1] = document.getElementById("lLogInForm");  //Referens till stor skärm log in form

    if(localStorage.getItem("username") !== null){  //Kollar om det finns en användare inloggad (sparad i localStorage)
        logInForm[0].style.display = "none";  //Om man är inloggad, göm inlogg mobil
        logInForm[1].style.display = "none";  //Om man är inloggad, göm inlogg stor skärm

        createBackButton();  //Eftersom att man är inloggad så ska man kunna gå tillbaka till sin sida. Skapar knappar som leder tillbaka till användarens sida

        document.getElementById("mBackButton").onclick = back;  //Går tillbaka till användarens sida när knappen klickas på, mobil
        document.getElementById("lBackButton").onclick = back;  //Går tillbaka till användarens sida när knappen klickas på, stor skärm
    }else{
        document.getElementById("mLogIn").onclick = logIn; //Logga in knapp mobil, kör logIn function när den klickas på
        document.getElementById("lLogIn").onclick = logIn;  //Logga in knapp stor skärm, kör logIn function när den klickas på
    }
}

function createBackButton(){
    let header = document.querySelector("header");  //Referens till header
    let footer = document.querySelector("footer");  //Referens till footer

    let button1 = document.createElement("input");  //Skapa input (kommer bli en knapp)
    button1.setAttribute("id", "lBackButton");  //Sätter id på input
    button1.setAttribute("type", "button");  //Sätter type på input, input blir en "button"
    button1.setAttribute("value", "Back To Your Page");  //Sätter det som ska stå på knappen
    
    let button2 = document.createElement("input");  //Skapa input (kommer bli en knapp)
    button2.setAttribute("id", "mBackButton");  //Sätter id på input
    button2.setAttribute("type", "button");  //Sätter type på input, input blir en "button"
    button2.setAttribute("value", "Back To Your Page");  //Sätter det som ska stå på knappen

    header.appendChild(button1);  //Lägger till knapp 1 i header
    footer.appendChild(button2);  //Lägger till knapp 2 i footer
}

function createLogInMessage(){
    let div = document.querySelector("div");  //Referens till första div elementet (som ligger i header)
    let text = document.createElement("h2");  //Skapar en h2 tagg med välkomstmeddelande
    text.innerHTML = "Welcome, <br>" + localStorage.getItem("username");  //Lägger in välkomstmeddelande

    div.appendChild(text);  //Lägger till texten i header
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
            
            location.replace("user.html");  //Går till användarens sida
        }).catch(err => {
            console.log(err);
    })
}

function logOut(){
    localStorage.removeItem("username");  //Rensar inloggad användare
    localStorage.removeItem("posts");  //Rensar sparade inlägg
    location.replace("index.html");  //Går tillbaka till första sidan
}

function back(){
    location.replace("user.html");  //Går tillbaka till användarens sida
}

function createUser(){  //Ej gjord


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