let myJSON = '{"name":"abc def","age": 55}';
let myObject = JSON.parse(myJSON);

students = {elev:[
    {"elevID":1, "firstName":"Isak", "lastName":"Bisak", "age":122},
    {"elevID":2, "firstName":"Nsak", "lastName":"Lisak", "age":12}
]}

let text = document.getElementById("text");
text.innerHTML=myObject.name + " " + myObject.age;


document.getElementById("fName").innerHTML = students.elev[0].firstName;
document.getElementById("lName").innerHTML = students.elev[0].lastName;
document.getElementById("age").innerHTML = students.elev[0].age;

document.getElementById("fName1").innerHTML = students.elev[1].firstName;
document.getElementById("lName1").innerHTML = students.elev[1].lastName;
document.getElementById("age1").innerHTML = students.elev[1].age;