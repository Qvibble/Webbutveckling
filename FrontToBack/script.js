var userData; //JSON object

window.onload = init;

function init(){
    let form = document.querySelector("form"); //Letar upp första "form" elementet
    form.addEventListener("submit", event =>{
        let name = form.elements.name.value; //Sparar inmatat namn
        let password = form.elements.password.value; //Sparar inmatat lösenord

        let hashedPassword = window.btoa(password); //Hashar lösenord

        userData = { //Skapar JSON
            "username": name,
            "password": hashedPassword
        }
        
        console.log(JSON.stringify(userData));
        
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

        event.preventDefault();
    })
}