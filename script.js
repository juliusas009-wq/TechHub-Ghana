/* =========================================================
   TECHHUB GHANA
   MASTER JAVASCRIPT
   Version: 2026
   Clean Mobile + Desktop Version
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("siteSearch");
    const darkBtn = document.getElementById("darkModeBtn");
    const today = document.getElementById("today");
    const topBtn = document.getElementById("topBtn");
    const footerYear = document.getElementById("footerYear");
    const newsletterForm = document.getElementById("newsletterForm");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuBtn) return;

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


    function closeMobileMenu() {

        if (!navMenu || !menuBtn) return;

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


    function toggleMobileMenu() {

        if (!navMenu || !menuBtn) return;

        const isOpen =
            navMenu.classList.contains("show");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileMenu();

            }
        );


        /* Close when clicking navigation link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        });


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    navMenu.classList.contains("show") &&
                    !navMenu.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* Close with Escape */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    if (navMenu) {

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            !currentPage ||
            currentPage === ""
        ) {

            currentPage = "index.html";

        }


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");


            if (!href) return;


            let linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();


            if (
                !linkPage ||
                linkPage === ""
            ) {

                linkPage = "index.html";

            }


            link.classList.remove("active");


            if (
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchForm && searchInput) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const query =
                    searchInput.value.trim();


                if (!query) {

                    searchInput.focus();

                    return;

                }


                window.location.href =
                    "news.html?search=" +
                    encodeURIComponent(query);

            }
        );

    }


    /* =====================================================
       DATE
    ===================================================== */

    function updateDate() {

        if (!today) return;


        const date =
            new Date();


        const formattedDate =
            date.toLocaleDateString(
                "en-GH",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );


        /*
           Keep the calendar icon if the
           homepage already contains one.
        */

        const dateSpan =
            today.querySelector("span");


        if (dateSpan) {

            dateSpan.textContent =
                formattedDate;

        } else {

            today.textContent =
                formattedDate;

        }

    }


    updateDate();


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    if (darkBtn) {

        const savedTheme =
            localStorage.getItem("theme");


        if (savedTheme === "dark") {

            document.body.classList.add("dark");

            darkBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            darkBtn.setAttribute(
                "title",
                "Switch to light mode"
            );

        }


        darkBtn.addEventListener(
            "click",
            function () {

                const isDark =
                    document.body.classList.toggle(
                        "dark"
                    );


                localStorage.setItem(
                    "theme",
                    isDark
                        ? "dark"
                        : "light"
                );


                darkBtn.setAttribute(
                    "aria-label",
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                );


                darkBtn.setAttribute(
                    "title",
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateTopButton() {

        if (!topBtn) return;


        if (window.scrollY > 400) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    }


    if (topBtn) {

        updateTopButton();


        window.addEventListener(
            "scroll",
            updateTopButton,
            {
                passive: true
            }
        );


        topBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailInput =
                    newsletterForm.querySelector(
                        'input[type="email"]'
                    );


                if (!emailInput) return;


                const email =
                    emailInput.value.trim();


                if (!email) {

                    emailInput.focus();

                    return;

                }


                alert(
                    "Thanks for subscribing to TechHub Ghana. Newsletter delivery will be connected soon."
                );


                newsletterForm.reset();

            }
        );

    }


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


    if (
        heroImage &&
        heroImages.length > 1
    ) {

        let currentImage = 0;


        /*
           Only run the slider if the image
           exists.
        */

        let sliderInterval;


        function changeHeroImage() {

            currentImage =
                (
                    currentImage + 1
                ) %
                heroImages.length;


            heroImage.style.opacity = "0";


            setTimeout(
                function () {

                    heroImage.src =
                        heroImages[currentImage];


                    heroImage.style.opacity =
                        "1";

                },
                250
            );

        }


        sliderInterval =
            setInterval(
                changeHeroImage,
                5000
            );


        /*
           Stop unnecessary work if page
           is hidden.
        */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden &&
                    sliderInterval
                ) {

                    clearInterval(
                        sliderInterval
                    );

                    sliderInterval = null;

                } else if (
                    !document.hidden &&
                    !sliderInterval
                ) {

                    sliderInterval =
                        setInterval(
                            changeHeroImage,
                            5000
                        );

                }

            }
        );

    }


    /* =====================================================
       PREVENT ACCIDENTAL HORIZONTAL SCROLL
    ===================================================== */

    document.documentElement.style.overflowX =
        "hidden";

    document.body.style.overflowX =
        "hidden";


    /* =====================================================
       MOBILE RESIZE
       Close navigation when returning to desktop.
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 768
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    closeMobileMenu();

                }
            );

        }
    );


    /* =====================================================
       IMAGE ERROR PROTECTION
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
