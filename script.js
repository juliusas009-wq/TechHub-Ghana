/* =========================================================
   TECHHUB GHANA
   COMPLETE MASTER JAVASCRIPT
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

            navMenu.classList.toggle("show");

            const isOpen =
                navMenu.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.innerHTML =
                isOpen ? "✕" : "☰";

        });


        /* Close menu after clicking a link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML = "☰";

            });

        });


        /* Close when clicking outside */

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

                menuBtn.innerHTML = "☰";

            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    if (navMenu) {

        let currentPage =
            window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        if (!currentPage) {
            currentPage = "index.html";
        }

        const links =
            navMenu.querySelectorAll("a");

        links.forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href
                .split("/")
                .pop()
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
        }

    }


    if (darkBtn) {

        darkBtn.addEventListener(
            "click",
            function () {

                document.body.classList.toggle("dark");

                const isDark =
                    document.body.classList.contains("dark");


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                darkBtn.textContent =
                    isDark ? "☀️" : "🌙";

            }
        );

    }


    /* =====================================================
       SITE SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("siteSearch");

    const searchBtn =
        document.getElementById("searchBtn");


    function performSearch() {

        if (!searchInput) return;

        const keyword =
            searchInput.value.trim().toLowerCase();

        if (!keyword) return;


        const searchableElements =
            document.querySelectorAll(
                ".news-card, .tool-card, .card, .tutorial, .article-page"
            );


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
                "No results found for: " + keyword
            );

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
                "en-US",
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

        topButton.innerHTML = "⬆";

        topButton.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(topButton);

    }


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 300) {

                topButton.style.display =
                    "block";

            } else {

                topButton.style.display =
                    "none";

            }

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
        document.querySelector(
            ".hero-image img"
        );


    const heroImages = [
        "images/hero.jpg",
        "images/tech1.jpg",
        "images/tech2.jpg",
        "images/tech3.jpg"
    ];


    if (heroImage && heroImages.length > 1) {

        let currentImage = 0;


        setInterval(function () {

            currentImage++;

            if (
                currentImage >=
                heroImages.length
            ) {

                currentImage = 0;

            }


            heroImage.src =
                heroImages[currentImage];

        }, 5000);

    }

});
