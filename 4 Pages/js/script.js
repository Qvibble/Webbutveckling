let pages = ["Start", "Sida 2", "Sida 3", "Sida 4"];
let artElements = 10;
let ul;

window.onload = init;

function init(){
    ul = document.getElementById("navUl");  
    article = document.getElementById("art");  

    for(let i = 0; i < pages.length; i++){
        createNavElement(pages[i], i);
    }

    if(article !== null){
        for(let i = 0; i < artElements; i++){
            createArticleElement(i);
        }
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

function createArticleElement(index){
    let sec = document.createElement("section");
    sec.setAttribute("id", "sec" + index);
    article.appendChild(sec);

    let img = document.createElement("img");
    img.setAttribute("id", "img" + index);
    img.setAttribute("src", "../images/simba.gif");
    sec.appendChild(img);

    let p = document.createElement("p");
    p.setAttribute("id", "p" + index);
    p.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    sec.appendChild(p);

}