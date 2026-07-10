document.getElementById("loginForm")
.addEventListener("submit", function(e){

e.preventDefault();


let email = document.getElementById("loginEmail").value;

let password = document.getElementById("loginPassword").value;



let savedEmail = localStorage.getItem("userEmail");

let savedPassword = localStorage.getItem("userPassword");



if(email === savedEmail && password === savedPassword){

alert("Login successful!");

window.location.href="dashboard.html";


}

else{

alert("Incorrect email or password");

}


});

// SIGNUP SYSTEM

const signupForm = document.getElementById("signupForm");


if(signupForm){


signupForm.addEventListener("submit", function(e){


e.preventDefault();


let username = document.getElementById("username").value;

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



localStorage.setItem("username", username);

localStorage.setItem("userEmail", email);

localStorage.setItem("userPassword", password);



alert("Account created successfully!");


window.location.href="login.html";


});


}

// DISPLAY USER NAME

const displayName = document.getElementById("displayName");


if(displayName){

let username = localStorage.getItem("username");


if(username){

displayName.textContent = username;

}

}



// LOGOUT FUNCTION

function logout(){

localStorage.removeItem("userEmail");

localStorage.removeItem("userPassword");

localStorage.removeItem("username");


alert("You have logged out");


window.location.href="login.html";


}