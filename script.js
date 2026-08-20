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

    function closeMobileMenu() {

        if (!menuBtn || !navMenu) return;

        navMenu.classList.remove("show");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function openMobileMenu() {

        if (!menuBtn || !navMenu) return;

        navMenu.classList.add("show");
        menuBtn.classList.add("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("show");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        /* Close after selecting a navigation link */

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMobileMenu();
            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                navMenu.classList.contains("show") &&
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                closeMobileMenu();

            }

        });


        /* Close with Escape */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMobileMenu();
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


        navMenu.querySelectorAll("a").forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;


            const linkPage =
                href
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


        today.innerHTML = `

            <i
                class="fa-regular fa-calendar"
                aria-hidden="true"
            ></i>

            <span>
                ${date.toLocaleDateString(
                    "en-GH",
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                )}
            </span>

        `;

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

        topButton.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        topButton.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(topButton);

    }


    function updateTopButton() {

        if (window.scrollY > 300) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateTopButton,
        {
            passive: true
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


    updateTopButton();


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

});
