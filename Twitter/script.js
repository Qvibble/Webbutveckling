window.onload = init;

function init(){
    for(let i = 0; i < 5; i++){
        createPosts(i);
    }
}

function createPosts(nr){
    let article = document.getElementById("art");
    let section = document.createElement("section");
    section.setAttribute("id", "sec" + nr);
    article.appendChild(section);
}