/* ==========================================
   TECH HUB V2 - script.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       DARK MODE
    ========================== */

    const darkBtn = document.getElementById("darkModeBtn");

    if (darkBtn) {

        // Restore previous theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            darkBtn.textContent = "☀️";
        }

        darkBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                darkBtn.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                darkBtn.textContent = "🌙";
            }

        });

    }

    /* ==========================
       SEARCH
    ========================== */

    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const cards = document.querySelectorAll(
                ".tool-card, .news-card, .tutorial"
            );

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    /* ==========================
       BUTTON HOVER EFFECT
    ========================== */

    const buttons = document.querySelectorAll("button");

    buttons.forEach(btn => {

        btn.addEventListener("mouseenter", function () {

            btn.style.transform = "scale(1.05)";

        });

        btn.addEventListener("mouseleave", function () {

            btn.style.transform = "scale(1)";

        });

    });

});


/* ==========================
   HERO IMAGE SLIDER
========================== */

const heroImages = [

    "images/hero.jpg",
    "images/tech1.jpg",
    "images/tech2.jpg",
    "images/tech3.jpg"

];

let currentImage = 0;

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    setInterval(function () {

        currentImage++;

        if (currentImage >= heroImages.length) {

            currentImage = 0;

        }

        heroImage.src = heroImages[currentImage];

    }, 5000);

}


/* ==========================
   LIVE DATE
========================== */

function updateDate() {

    const date = new Date();

    const options = {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    };

    const element = document.getElementById("today");

    if (element) {

        element.innerHTML = date.toLocaleDateString("en-US", options);

    }

}

updateDate();


/* ==========================
   BACK TO TOP BUTTON
========================== */

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.display = "none";
topButton.style.padding = "15px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#0056d2";
topButton.style.color = "white";
topButton.style.cursor = "pointer";
topButton.style.fontSize = "18px";

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});