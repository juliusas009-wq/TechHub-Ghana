/* =========================================================
   TECHHUB GHANA
   GHANA TECH SEARCH + FILTER
   MATCHED TO GHANA-TECH.HTML
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("ghanaSearch");

    const topSearch =
        document.getElementById("siteSearch");

    const searchButton =
        document.querySelector("#searchForm button");

    const filters =
        document.querySelectorAll(".ghana-filter");

    const newsGrid =
        document.getElementById("ghanaNewsGrid");

    const featured =
        document.getElementById("ghanaFeatured");

    const message =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("noGhanaNews");

    const newsSection =
        document.getElementById("ghanaNews");

    const trendingLinks =
        document.querySelectorAll(
            ".ghana-trending-grid a[data-trending]"
        );


    /* =====================================================
       STATE
    ====================================================== */

    let currentCategory = "All";


    /* =====================================================
       GET NEWS ARTICLES
    ====================================================== */

    function getArticles() {

        const cards =
            newsGrid
                ? newsGrid.querySelectorAll(".ghana-news-card")
                : [];

        return Array.from(cards);

    }


    /* =====================================================
       NORMALIZE TEXT
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* =====================================================
       FILTER ARTICLES
    ====================================================== */

    function filterArticles() {

        const articles = getArticles();

        const searchTerm =
            normalize(
                searchInput
                    ? searchInput.value
                    : ""
            );

        let visibleArticles = 0;


        /* =================================================
           FILTER NEWS CARDS
        ================================================== */

        articles.forEach(function (article) {

            const category =
                normalize(
                    article.dataset.category
                );

            const title =
                normalize(
                    article.dataset.title
                );

            const content =
                normalize(
                    article.textContent
                );


            const categoryMatch =
                currentCategory === "All" ||
                category === normalize(currentCategory);


            const searchMatch =
                searchTerm === "" ||
                title.includes(searchTerm) ||
                content.includes(searchTerm) ||
                category.includes(searchTerm);


            if (categoryMatch && searchMatch) {

                article.style.display = "";

                visibleArticles++;

            } else {

                article.style.display = "none";

            }

        });


        /* =================================================
           FEATURED STORY
        ================================================== */

        if (featured) {

            const featuredCategoryElement =
                document.getElementById(
                    "featuredCategory"
                );

            const featuredTitleElement =
                document.getElementById(
                    "featuredTitle"
                );

            const featuredDescriptionElement =
                document.getElementById(
                    "featuredDescription"
                );


            const featuredCategory =
                normalize(
                    featuredCategoryElement
                        ? featuredCategoryElement.textContent
                        : ""
                );

            const featuredTitle =
                normalize(
                    featuredTitleElement
                        ? featuredTitleElement.textContent
                        : ""
                );

            const featuredDescription =
                normalize(
                    featuredDescriptionElement
                        ? featuredDescriptionElement.textContent
                        : ""
                );


            const featuredText =
                featuredTitle +
                " " +
                featuredDescription +
                " " +
                featuredCategory;


            const featuredCategoryMatch =
                currentCategory === "All" ||
                featuredCategory.includes(
                    normalize(currentCategory)
                );


            const featuredSearchMatch =
                searchTerm === "" ||
                featuredText.includes(searchTerm);


            if (
                featuredCategoryMatch &&
                featuredSearchMatch
            ) {

                featured.style.display = "";

            } else {

                featured.style.display = "none";

            }

        }


        /* =================================================
           NO RESULTS MESSAGE
        ================================================== */

        if (noResults) {

            if (
                visibleArticles === 0 &&
                articles.length > 0
            ) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }


        /* =================================================
           SEARCH STATUS MESSAGE
        ================================================== */

        if (message) {

            if (articles.length === 0) {

                message.textContent =
                    "Ghana Tech stories are loading...";

            } else if (visibleArticles === 0) {

                message.textContent =
                    "No Ghana Tech stories match your search.";

            } else if (searchTerm !== "") {

                message.textContent =
                    visibleArticles +
                    " result" +
                    (visibleArticles === 1 ? "" : "s") +
                    ' found for "' +
                    searchInput.value.trim() +
                    '".';

            } else if (currentCategory !== "All") {

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
                    " stor" +
                    (visibleArticles === 1
                        ? "y"
                        : "ies") +
                    " in " +
                    categoryName +
                    ".";

            } else {

                message.textContent =
                    "Showing all Ghana Tech stories.";

            }

        }


        /* =================================================
           UPDATE STORY COUNT
        ================================================== */

        const countElement =
            document.getElementById(
                "ghanaNewsCount"
            );


        if (countElement) {

            countElement.textContent =
                visibleArticles;

        }

    }


    /* =====================================================
       CATEGORY BUTTONS
    ====================================================== */

    filters.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filters.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category ||
                    "All";


                filterArticles();

            }
        );

    });


    /* =====================================================
       LIVE SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterArticles();

            }
        );

    }


    /* =====================================================
       SEARCH BUTTON
    ====================================================== */

    const localSearchButton =
        document.getElementById(
            "ghanaSearchBtn"
        );


    if (localSearchButton) {

        localSearchButton.addEventListener(
            "click",
            function () {

                filterArticles();

                if (newsSection) {

                    newsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       HEADER SEARCH
    ====================================================== */

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


        /* Reset category */

        currentCategory = "All";


        filters.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );


                if (
                    button.dataset.category ===
                    "All"
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


        filterArticles();


        if (newsSection) {

            newsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                performHeaderSearch();

            }
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
       TRENDING LINKS
    ====================================================== */

    trendingLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const trendingCategory =
                    link.dataset.trending;


                if (!trendingCategory) {

                    return;

                }


                currentCategory =
                    trendingCategory;


                filters.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );


                        if (
                            normalize(
                                button.dataset.category
                            ) ===
                            normalize(
                                trendingCategory
                            )
                        ) {

                            button.classList.add(
                                "active"
                            );

                        }

                    }
                );


                if (searchInput) {

                    searchInput.value = "";

                }


                filterArticles();

            }
        );

    });


    /* =====================================================
       NEWS GRID OBSERVER
       
       Useful when news cards are added dynamically
       by another JavaScript file.
    ====================================================== */

    if (newsGrid) {

        const observer =
            new MutationObserver(
                function () {

                    filterArticles();

                }
            );


        observer.observe(
            newsGrid,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    filterArticles();

});
