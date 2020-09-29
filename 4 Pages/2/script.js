let pages = ["Start", "Sida 2", "Sida 3", "Sida 4"];
let ul;

window.onload = init;

function init(){
    ul = document.getElementById("navUl");  
    article = document.getElementById("art");  

    for(let i = 0; i < pages.length; i++){
        createNavElement(pages[i], i);
    }

    for(let i = 0; i < pages.length*10; i++){
        createArticleElement(pages[i], i);
    }
}

function createNavElement(name, index){
    let li = document.createElement("li");
    li.setAttribute("id", "ulLi" + index);
    ul.appendChild(li);

    let a = document.createElement("a");
    a.setAttribute("href", "../"+ (index+1) +"/index.html");
    a.innerHTML = name;
    document.getElementById("ulLi" + index).appendChild(a);
}

function createArticleElement(name, index){
    let sec = document.createElement("section");
    sec.setAttribute("id", "sec" + index);
    article.appendChild(sec);
}