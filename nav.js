document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (!menuBtn || !navMenu) {
        console.error("Navigation elements not found.");
        return;
    }

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        const opened = navMenu.classList.contains("show");

        menuBtn.setAttribute("aria-expanded", opened);

        menuBtn.textContent = opened ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.textContent = "☰";

        });

    });

});
