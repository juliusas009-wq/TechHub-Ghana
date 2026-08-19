/* =========================================================
   TECHHUB GHANA
   LOGIN • SIGNUP • DASHBOARD SYSTEM
========================================================= */


/* =========================================================
   LOGIN SYSTEM
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const emailInput =
            document.getElementById("loginEmail");

        const passwordInput =
            document.getElementById("loginPassword");

        if (!emailInput || !passwordInput) {
            return;
        }

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        /* Check empty fields */

        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        /* Get saved account */

        const savedEmail =
            localStorage.getItem("userEmail");

        const savedPassword =
            localStorage.getItem("userPassword");


        /* Check whether account exists */

        if (!savedEmail || !savedPassword) {

            alert(
                "No account found. Please create an account first."
            );

            return;
        }


        /* Check login details */

        if (
            email === savedEmail &&
            password === savedPassword
        ) {

            /* Create login session */

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            alert("Login successful!");


            window.location.href =
                "dashboard.html";

        } else {

            alert(
                "Incorrect email or password."
            );

        }

    });

}



/* =========================================================
   SIGNUP SYSTEM
========================================================= */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const usernameInput =
                document.getElementById("username");

            const emailInput =
                document.getElementById("email");

            const passwordInput =
                document.getElementById("password");


            if (
                !usernameInput ||
                !emailInput ||
                !passwordInput
            ) {

                return;

            }


            const username =
                usernameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            /* Validate fields */

            if (
                !username ||
                !email ||
                !password
            ) {

                alert(
                    "Please complete all fields."
                );

                return;
            }


            /* Validate email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            /* Check password length */

            if (password.length < 6) {

                alert(
                    "Password must be at least 6 characters long."
                );

                return;
            }


            /* Check if an account already exists */

            const existingEmail =
                localStorage.getItem("userEmail");


            if (
                existingEmail &&
                existingEmail.toLowerCase() ===
                email.toLowerCase()
            ) {

                alert(
                    "An account with this email already exists."
                );

                return;
            }


            /* Save account */

            localStorage.setItem(
                "username",
                username
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            localStorage.setItem(
                "userPassword",
                password
            );


            /* Account is not automatically logged in */

            localStorage.removeItem(
                "isLoggedIn"
            );


            alert(
                "Account created successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

}



/* =========================================================
   DASHBOARD USER NAME
========================================================= */

const displayName =
    document.getElementById("displayName");


if (displayName) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const username =
        localStorage.getItem("username");


    /* Protect dashboard */

    if (isLoggedIn !== "true") {

        alert(
            "Please log in to access your dashboard."
        );

        window.location.href =
            "login.html";

    } else {

        if (username) {

            displayName.textContent =
                username;

        } else {

            displayName.textContent =
                "User";

        }

    }

}



/* =========================================================
   LOGOUT SYSTEM
========================================================= */

function logout() {

    /* Remove login session only */

    localStorage.removeItem(
        "isLoggedIn"
    );


    alert(
        "You have been logged out."
    );


    window.location.href =
        "login.html";

}



/* =========================================================
   MAKE LOGOUT AVAILABLE TO HTML
========================================================= */

window.logout = logout;
