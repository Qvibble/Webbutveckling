var logInForm = [] //0 = mobil, 1 = stor skärm

window.onload = init;  //Körs när sidan laddas in

/**
 * Sökknapparna länkas till sök funktionen.
 * Avgör vilken sida som laddas och gör olika beroende på sida
 */
function init(){    
    document.getElementById("mSearchButton").onclick = search;
    document.getElementById("lSearchButton").onclick = search;

    if(!document.querySelector("body").getAttribute("id")){  //Om första sidan
        formSettings(); //Skapar referens till inloggs formulären, kollar om en användare är inloggad, skapar knappar som länkar tillbaka till användarens sida om en användare är inloggad 

        fetchRandomPosts();  //Hämta slumpade inlägg och skriv ut dem på första sidan
    }

    if(document.querySelector("body").getAttribute("id") === "searchPage") {  //Om searchPage (visar sökta personens inlägg)
        formSettings();  //Skapar referens till inloggs formulären, kollar om en användare är inloggad, skapar knappar som länkar tillbaka till användarens sida om en användare är inloggad 

        let posts = JSON.parse(sessionStorage.getItem("searchedPosts"));  //Tar emot den sökta personens inlägg och gör om till JSON objekt
        let postsLength = Object.keys(posts).length;  //Sparar längden på posts

        for(let i = 0; i< postsLength; i++){
            createPosts(i, posts[i], sessionStorage.getItem("searchedUser"));  //Skapar inläggen
        }
    }

    if(document.querySelector("body").getAttribute("id") === "userPage"){  //Om användarsidan (egen sida)
        document.getElementById("mLogOut").onclick = logOut;  //Logga ut knapp mobil, kör logOut function när den klickas på
        document.getElementById("lLogOut").onclick = logOut;  //Logga ut knappa stor skärm, kör logOut function när den klickas på

        document.getElementById("mPublishButton").onclick = publishPost;
        document.getElementById("lPublishButton").onclick = publishPost;
        
        let posts = JSON.parse(sessionStorage.getItem("posts"));  //Tar emot den inoggade användarens 5 inlägg i form av en JSON string. Konverterar JSON string till JSON objekt 
        let postsLength;
        if(posts != null){
            postsLength = Object.keys(posts).length;  //Sparar längden på posts
            
            for(let i = 0; i < postsLength; i++){
                createPosts(i, posts[i], sessionStorage.getItem("username"));  //Skapar inläggen
            }
        }

        createLogInMessage();  //Skapar välkomstmeddelande
    }
}

/**
 * Skapar referens till inloggnings/skapa användare formulären. Kollar om någon är inloggar, gömmer då inlogg och visar tillbaka knapp. 
 * Ingen inloggad? knapparna länkas till funktionerna
 */
function formSettings(){
    logInForm[0] = document.getElementById("mLogInForm");  //Referens till mobil log in form
    logInForm[1] = document.getElementById("lLogInForm");  //Referens till stor skärm log in form

    if(sessionStorage.getItem("username") !== null){  //Kollar om det finns en användare inloggad (sparad i sessionStorage)
        logInForm[0].style.display = "none";  //Om man är inloggad, göm inlogg mobil
        logInForm[1].style.display = "none";  //Om man är inloggad, göm inlogg stor skärm

        createBackButton();  //Eftersom att man är inloggad så ska man kunna gå tillbaka till sin sida. Skapar knappar som leder tillbaka till användarens sida

        document.getElementById("mBackButton").onclick = back;  //Går tillbaka till användarens sida när knappen klickas på, mobil
        document.getElementById("lBackButton").onclick = back;  //Går tillbaka till användarens sida när knappen klickas på, stor skärm
    }else{
        document.getElementById("mLogIn").onclick = logIn; //Logga in knapp mobil, kör logIn function när den klickas på
        document.getElementById("lLogIn").onclick = logIn;  //Logga in knapp stor skärm, kör logIn function när den klickas på

        document.getElementById("mCreate").onclick = createUser;  //Skapa knapp mobil, kör createUser när den klickas på
        document.getElementById("lCreate").onclick = createUser;  //Skapa knapp stor skärm, kör createUser när den klickas på
    }
}

/**
 * Skapar en knapp som tar användaren tillbaka till sin egen sida när den klickas på
 */
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

/**
 * När användaren loggas in så skapas ett meddelande som välkommnar användaren när de är inne på sin egen sida
 */
function createLogInMessage(){
    let div = document.querySelector("div");  //Referens till första div elementet (som ligger i header)
    let text = document.createElement("h2");  //Skapar en h2 tagg med välkomstmeddelande
    text.innerHTML = "Welcome, <br>" + sessionStorage.getItem("username");  //Lägger in välkomstmeddelande

    div.appendChild(text);  //Lägger till texten i header
}

/**
 * Skapar x antal posts (avgörs av nr) där content är inlägget och author användaren som skapade inlägget
 * 
 * @param {nubmer} nr 
 * @param {string} content 
 * @param {string} author 
 */
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

/**
 * Loggar in användaren. Sparar namn och inlägg i sessionStorage samt skickar användaren till sin egen sida
 */
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
            return response.json();
        }).then(data => {          
            let posts = {};  //Holds posts from data

            for(let i = 0; i < data.length; i++){
                posts[i] = data[i].post;
            }
            
            sessionStorage.setItem("username", username);  //Sparar användare
            sessionStorage.setItem("posts", JSON.stringify(posts));  //Sparar data
            
            location.replace("user.html");  //Går till användarens sida
        }).catch(err => {
            console.log(err);
    })
}

/**
 * Loggar ut användaren. Rensar sessionStorage för namn och inlägg samt skickar användare till startsidan
 */
function logOut(){
    sessionStorage.removeItem("username");  //Rensar inloggad användare
    sessionStorage.removeItem("posts");  //Rensar sparade inlägg
    location.replace("index.html");  //Går tillbaka till första sidan
}

/**
 * Tar användaren tillbaka till sin egen sida
 */
function back(){
    location.replace("user.html");  //Går tillbaka till användarens sida
}

/**
 * Söker efter en användare från sökfältet och sparar användaren som sökten på och inläggen i sessionStorage om användaren finns
 */
function search(){
    let screenSize = this.name;  //Knappen som klickades på
    let searchedUser;  //Användare som söktes på

    if(screenSize === "mobileSearch"){  //om stor sida, spara stora sidans sök värde
        searchedUser = document.getElementById("mSearchBar").value;
    }else if(screenSize === "largeSearch"){  //om mobil sida, spara mobil sidans sök värde
        searchedUser = document.getElementById("lSearchBar").value;
    }

    fetch("http://localhost:8080/Twitter/api/posts", {
            method: "GET",
            mode: 'cors',
            headers: {  
                'Username': searchedUser,
                'Content-Type': 'text/plain'  //Typ av content
            },
    }).then((response) => {
        return response.json();
    }).then(data => {
        let posts = {};  //Håller inläggen

        for(let i = 0; i < data.length; i++){  //Sparar inläggen från data i posts
            posts[i] = data[i].post;
        }

        sessionStorage.setItem("searchedUser", searchedUser);  //Sparar användare som söktes på
        sessionStorage.setItem("searchedPosts", JSON.stringify(posts));  //Sparar inläggen
        
        location.replace("search.html");  //Går till sökta användaren sida/inlägg
    })
}

/**
 * Skapar en användare och sparar namnet i sessionStorage och går till användarens sida
 */
function createUser(){
    let screenSize = this.name;  //Knappen som klickas på, mobile/large
    let username;  //Namn på användare
    let password;  //Lösenord till användare

    if(screenSize === "mobileCreate"){
        username = logInForm[0].elements.username.value;  //Hämtar innehåll i användarnamnsfältet när knappen klickas på
        password = logInForm[0].elements.password.value;  //Hämtar innehåll i lösenordsfältet när knappen klickas på     
    }else if(screenSize === "largeCreate"){
        username = logInForm[1].elements.username.value;  //Hämtar innehåll i användarnamnsfältet när knappen klickas på
        password = logInForm[1].elements.password.value;  //Hämtar innehåll i lösenordsfältet när knappen klickas på
    }

    let hashPassword = btoa(password);  //Base64 hashning

    let userData = {  //JSON användarens namn + lösenord hashat
        "username": username,
        "password": hashPassword
    }

    fetch("http://localhost:8080/Twitter/api/user", {
        method: "POST",
        mode: 'cors',
        headers: {  
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(userData)
        }).then((response) => {
            if(response.ok){
                sessionStorage.setItem("username", username);  //Sparar användare
                location.replace("user.html");  //Går till användarens sida
            }

            return response.json();
        }).catch(err => {
            console.log(err);
    })
}

/**
 * Hämtar 5 slumpade inlägg från databasen och skapar sections där inläggen ligger
 */
function fetchRandomPosts(){
    fetch("http://localhost:8080/Twitter/api/posts", {
            method: "GET",
            mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then(data => {
        for(let i = 0; i < data.length; i++){
            createPosts(i, data[i].post, data[i].user); //Skapa 5 sections med inlägg
        }
    })
}

/**
 * Skapar inlägg från det som står i textarea och uppdaterar vilka inlägg användaren har
 */
function publishPost(){
    let screenSize = this.name;  //Vilken knapp som klickades på
    let postContent;  //Texten i inläggen

    if(screenSize === "mobilePost"){  //Om mobil skärm
        postContent = document.getElementById("mTextarea").value;  //Sparar mobil storlekens text
    }else if(screenSize === "largePost"){  //Om stor skärm
        postContent = document.getElementById("lTextarea").value;  //Sparar stor skärm text
    }

    let postData = {  //Objekt med anv och inlägget
        "user": sessionStorage.getItem("username"),
        "post": postContent
    }

    fetch("http://localhost:8080/Twitter/api/posts", {
        method: "POST",
        mode: 'cors',
        headers: {  
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(postData)  //JSON till sträng
        }).then((response) => {
            return response.json();
        }).then(data => {
            let posts = {};  //Håller inläggen

            for(let i = 0; i < data.length; i++){
                posts[i] = data[i].post;  //Sparar inläggen
            }
            
            sessionStorage.setItem("posts", JSON.stringify(posts));  //Sparar inläggen i sessionen
            
            location.replace("user.html");  //Går till/uppdaterar användarens sida
        }).catch(err => {
            console.log(err);
    })
}