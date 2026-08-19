/* =========================================================
   TECHHUB GHANA
   GHANA TECH SEARCH + FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("ghanaNewsSearch");

    const topSearch =
        document.getElementById("ghanaSearch");

    const searchButton =
        document.getElementById("ghanaSearchBtn");

    const filters =
        document.querySelectorAll(".ghana-filter");

    const articles =
        document.querySelectorAll(
            ".ghana-news-card, .ghana-featured-card"
        );

    const message =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("ghanaNoResults");


    let currentCategory = "all";


    /* =====================================================
       FILTER ARTICLES
    ===================================================== */

    function filterArticles() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleArticles = 0;


        articles.forEach(function (article) {

            const category =
                article.dataset.category || "";

            const title =
                article.dataset.title || "";

            const content =
                article.textContent.toLowerCase();


            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory;


            const searchMatch =
                searchTerm === "" ||
                title.toLowerCase().includes(searchTerm) ||
                content.includes(searchTerm);


            if (categoryMatch && searchMatch) {

                article.style.display = "";

                visibleArticles++;

            } else {

                article.style.display = "none";

            }

        });


        /* =================================================
           RESULTS MESSAGE
        ================================================= */

        if (visibleArticles === 0) {

            noResults.style.display = "block";

            message.textContent =
                "No Ghana Tech stories match your search.";

        } else {

            noResults.style.display = "none";

            if (searchTerm !== "") {

                message.textContent =
                    visibleArticles +
                    " result(s) found for \"" +
                    searchTerm +
                    "\".";

            } else if (currentCategory !== "all") {

                const activeButton =
                    document.querySelector(
                        ".ghana-filter.active"
                    );

                const categoryName =
                    activeButton
                        ? activeButton.textContent.trim()
                        : currentCategory;

                message.textContent =
                    visibleArticles +
                    " story/stories in " +
                    categoryName +
                    ".";

            } else {

                message.textContent =
                    "Showing all Ghana Tech stories.";

            }

        }

    }


    /* =====================================================
       CATEGORY BUTTONS
    ===================================================== */

    filters.forEach(function (button) {

        button.addEventListener("click", function () {

            filters.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterArticles();

        });

    });


    /* =====================================================
       LIVE SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterArticles
        );

    }


    /* =====================================================
       HEADER SEARCH
       Sends the search text into Ghana Tech search.
    ===================================================== */

    function performHeaderSearch() {

        if (!topSearch || !searchInput) {
            return;
        }


        const value =
            topSearch.value.trim();


        if (value === "") {
            return;
        }


        searchInput.value = value;


        document
            .getElementById("ghana-news")
            .scrollIntoView({
                behavior: "smooth"
            });


        filterArticles();

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performHeaderSearch
        );

    }


    if (topSearch) {

        topSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performHeaderSearch();

                }

            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    filterArticles();

});
