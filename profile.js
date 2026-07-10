let name = localStorage.getItem("username");

let email = localStorage.getItem("userEmail");


if(name){

document.getElementById("profileName").textContent = name;

}


if(email){

document.getElementById("profileEmail").textContent = email;

}