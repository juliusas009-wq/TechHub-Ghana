/* =========================================================
   TECHHUB GHANA
   SIGNUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("signupForm");

    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();


        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        if (!username || !email || !password) {

            alert("Please complete all fields.");

            return;
        }


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        const user = {

            username,
            email,

            // For a real production website,
            // passwords should NOT be stored this way.
            password

        };


        localStorage.setItem(
            "techhubUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully! 🎉"
        );


        window.location.href =
            "login.html";

    });

});
