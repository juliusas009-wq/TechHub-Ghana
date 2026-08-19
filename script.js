/* =========================================================
   TECHHUB GHANA
   MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("show");

            const isOpen = navMenu.classList.contains("show");

            menuBtn.setAttribute("aria-expanded", isOpen);

            menuBtn.textContent = isOpen ? "✕" : "☰";
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    const darkBtn = document.getElementById("darkModeBtn");

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark");

            if (darkBtn) {
                darkBtn.textContent = "☀️";
                darkBtn.setAttribute("aria-label", "Switch to light mode");
            }

        } else {

            document.body.classList.remove("dark");

            if (darkBtn) {
                darkBtn.textContent = "🌙";
                darkBtn.setAttribute("aria-label", "Switch to dark mode");
            }

        }

    }


    const savedTheme = localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);


    if (darkBtn) {

        darkBtn.addEventListener("click", () => {

            const newTheme =
                document.body.classList.contains("dark")
                    ? "light"
                    : "dark";

            localStorage.setItem("theme", newTheme);

            applyTheme(newTheme);

        });

    }


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    const searchInput = document.querySelector(
        ".search-box input:not(#tutorialSearch)"
    );

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const value = this.value.toLowerCase().trim();

            const cards = document.querySelectorAll(
                ".tool-card, .news-card, .tutorial, .ghana-news-card"
            );

            cards.forEach(card => {

                const text = card.textContent.toLowerCase();

                card.style.display =
                    !value || text.includes(value)
                        ? ""
                        : "none";

            });

        });

    }


    /* =====================================================
       HERO IMAGE SLIDER
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image img");

    const heroImages = [
        "images/hero.jpg",
        "images/tech1.jpg",
        "images/tech2.jpg",
        "images/tech3.jpg"
    ];

    let currentImage = 0;

    if (heroImage && heroImages.length > 1) {

        setInterval(() => {

            currentImage =
                (currentImage + 1) % heroImages.length;

            heroImage.style.opacity = "0";

            setTimeout(() => {

                heroImage.src = heroImages[currentImage];

                heroImage.style.opacity = "1";

            }, 250);

        }, 5000);

    }


    /* =====================================================
       LIVE DATE
    ===================================================== */

    const todayElement =
        document.getElementById("today");

    if (todayElement) {

        const today = new Date();

        todayElement.textContent =
            today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById("topBtn");

    if (topButton) {

        window.addEventListener("scroll", () => {

            topButton.classList.toggle(
                "show",
                window.scrollY > 400
            );

        });

        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    document.querySelectorAll(".newsletter form, .ghana-newsletter form")
        .forEach(form => {

            form.addEventListener("submit", event => {

                event.preventDefault();

                const email =
                    form.querySelector("input[type='email']");

                if (!email || !email.value.trim()) {
                    return;
                }

                alert(
                    "Thank you for subscribing to TechHub Ghana! 📩"
                );

                email.value = "";

            });

        });

});


/* =========================================================
   BACK TO TOP CREATION
========================================================= */

function createBackToTop() {

    if (document.getElementById("topBtn")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "topBtn";
    button.type = "button";
    button.innerHTML = "↑";
    button.setAttribute("aria-label", "Back to top");

    document.body.appendChild(button);

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", () => {

        button.classList.toggle(
            "show",
            window.scrollY > 400
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    createBackToTop
);


/* =========================================================
   GLOBAL MOBILE MENU FUNCTION
   Keeps onclick="toggleMenu()" working
========================================================= */

function toggleMenu() {

    const menu =
        document.getElementById("navMenu");

    const button =
        document.querySelector(".menu-btn");

    if (!menu) return;

    menu.classList.toggle("show");

    if (button) {

        const isOpen =
            menu.classList.contains("show");

        button.textContent =
            isOpen ? "✕" : "☰";

        button.setAttribute(
            "aria-expanded",
            isOpen
        );

    }

}
