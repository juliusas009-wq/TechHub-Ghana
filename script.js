/* =========================================================
   TECHHUB GHANA
   MASTER JAVASCRIPT
   Version: 2026
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("show");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuBtn.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu when clicking a link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.textContent = "☰";
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.textContent = "☰";
            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    if (navMenu) {

        let currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        if (!currentPage) {
            currentPage = "index.html";
        }

        const links = navMenu.querySelectorAll("a");

        links.forEach(function (link) {

            const href = link.getAttribute("href");

            if (!href) return;

            const linkPage = href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

            link.classList.remove("active");

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        });

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    const darkBtn =
        document.getElementById("darkModeBtn");

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (darkBtn) {
            darkBtn.textContent = "☀️";
            darkBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    }


    if (darkBtn) {

        darkBtn.addEventListener("click", function () {

            const isDark =
                document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            darkBtn.textContent =
                isDark ? "☀️" : "🌙";

            darkBtn.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        });

    }


    /* =====================================================
       SITE SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("siteSearch");

    /*
       Support both IDs because older pages may use
       searchBtn while newer pages use siteSearchBtn.
    */

    const searchBtn =
        document.getElementById("siteSearchBtn") ||
        document.getElementById("searchBtn");


    function performSearch() {

        if (!searchInput) return;

        const keyword =
            searchInput.value.trim().toLowerCase();

        if (!keyword) {

            alert("Please enter something to search.");

            searchInput.focus();

            return;
        }


        const searchableElements =
            document.querySelectorAll(
                ".news-card, .tool-card, .card, .tutorial, .article-page, article"
            );


        /*
           If there are no searchable cards on the page,
           send the user to the News page.
        */

        if (searchableElements.length === 0) {

            window.location.href =
                "news.html?search=" +
                encodeURIComponent(keyword);

            return;
        }


        let found = false;


        searchableElements.forEach(function (element) {

            const text =
                element.innerText.toLowerCase();

            if (text.includes(keyword)) {

                element.style.display = "";

                found = true;

            } else {

                element.style.display = "none";

            }

        });


        if (!found) {

            alert(
                'No results found for "' +
                keyword +
                '".'
            );

            searchableElements.forEach(function (element) {
                element.style.display = "";
            });

        }

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       LIVE DATE
    ===================================================== */

    const today =
        document.getElementById("today");


    if (today) {

        const date = new Date();

        today.textContent =
            date.toLocaleDateString(
                "en-GH",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    let topButton =
        document.getElementById("topBtn");


    if (!topButton) {

        topButton =
            document.createElement("button");

        topButton.id = "topBtn";

        topButton.type = "button";

        topButton.innerHTML = "↑";

        topButton.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(topButton);

    }


    /*
       Initial state
    */

    topButton.style.display =
        window.scrollY > 300
            ? "flex"
            : "none";


    window.addEventListener(
        "scroll",
        function () {

            topButton.style.display =
                window.scrollY > 300
                    ? "flex"
                    : "none";

        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


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


    if (
        heroImage &&
        heroImages.length > 1
    ) {

        let currentImage = 0;


        /*
           Only start the slider if the first image
           actually has a valid-looking source.
        */

        if (!heroImage.getAttribute("src")) {
            heroImage.src = heroImages[0];
        }


        setInterval(function () {

            currentImage =
                (currentImage + 1) %
                heroImages.length;


            heroImage.style.opacity = "0";


            setTimeout(function () {

                heroImage.src =
                    heroImages[currentImage];

                heroImage.style.opacity = "1";

            }, 250);

        }, 5000);

    }


    /* =====================================================
       ESCAPE KEY
       Close mobile menu
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navMenu &&
                menuBtn
            ) {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.textContent = "☰";

            }

        }
    );

});
