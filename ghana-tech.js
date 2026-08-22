/* =========================================================
   TECHHUB GHANA
   GHANA TECH AUTOMATIC NEWS + SEARCH + FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput = document.getElementById("ghanaSearch");
    const topSearch = document.getElementById("siteSearch");
    const searchButton = document.querySelector("#searchForm button");

    const filters = document.querySelectorAll(".ghana-filter");

    const newsGrid = document.getElementById("ghanaNewsGrid");
    const featured = document.getElementById("ghanaFeatured");

    const message = document.getElementById("ghanaSearchMessage");
    const noResults = document.getElementById("noGhanaNews");
    const newsSection = document.getElementById("ghanaNews");

    const trendingLinks = document.querySelectorAll(
        ".ghana-trending-grid a[data-trending]"
    );

    const countElement = document.getElementById("ghanaNewsCount");

    const featuredImage = document.getElementById("featuredImage");
    const featuredCategory = document.getElementById("featuredCategory");
    const featuredTitle = document.getElementById("featuredTitle");
    const featuredDescription = document.getElementById("featuredDescription");
    const featuredDate = document.getElementById("featuredDate");
    const featuredAuthor = document.getElementById("featuredAuthor");
    const featuredReadBtn = document.getElementById("featuredReadBtn");


    /* =====================================================
       STATE
    ====================================================== */

    let currentCategory = "All";
    let allArticles = [];


    /* =====================================================
       CONFIGURATION
    ====================================================== */

    const NEWS_FILE = "ghana-tech-news.json";


    /* =====================================================
       NORMALIZE TEXT
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* =====================================================
       ESCAPE HTML
       Prevents article data from injecting HTML/JS.
    ====================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       DATE FORMAT
    ====================================================== */

    function formatDate(value) {

        if (!value) {
            return "Recently";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Recently";
        }

        return new Intl.DateTimeFormat("en-GH", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date);

    }


    /* =====================================================
       FALLBACK IMAGE
    ====================================================== */

    function getFallbackImage(category) {

        const categoryText = normalize(category);

        if (categoryText.includes("artificial")) {
            return "images/ai-news.jpg";
        }

        if (categoryText.includes("cyber")) {
            return "images/cyber-news.jpg";
        }

        if (categoryText.includes("program")) {
            return "images/web-news.jpg";
        }

        if (categoryText.includes("cloud")) {
            return "images/cloud-news.jpg";
        }

        return "images/ghana-tech.jpg";

    }


    /* =====================================================
       SAFE ARTICLE URL
    ====================================================== */

    function getArticleURL(article) {

        const url = String(article.url || "").trim();

        if (
            url.startsWith("https://") ||
            url.startsWith("http://")
        ) {
            return url;
        }

        return "#";

    }


    /* =====================================================
       LOAD NEWS
    ====================================================== */

    async function loadNews() {

        if (!newsGrid) {
            return;
        }

        showLoading();

        try {

            const response = await fetch(
                NEWS_FILE + "?v=" + Date.now(),
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "News file returned HTTP " + response.status
                );
            }

            const data = await response.json();

            if (!data || !Array.isArray(data.articles)) {
                throw new Error(
                    "Invalid news data format."
                );
            }

            allArticles = data.articles
                .filter(function (article) {
                    return article &&
                        article.title &&
                        article.url;
                })
                .slice(0, 50);

            renderNews();

        } catch (error) {

            console.error(
                "TechHub Ghana news error:",
                error
            );

            allArticles = [];

            newsGrid.innerHTML = "";

            if (message) {
                message.textContent =
                    "Ghana Tech news could not be loaded right now. Please try again later.";
            }

            if (noResults) {
                noResults.style.display = "block";
            }

            if (countElement) {
                countElement.textContent = "0";
            }

        }

    }


    /* =====================================================
       SHOW LOADING
    ====================================================== */

    function showLoading() {

        if (!newsGrid) {
            return;
        }

        newsGrid.innerHTML = `
            <div class="news-loading">
                <div class="loading-spinner"></div>

                <p>
                    Loading the latest Ghana Tech stories...
                </p>
            </div>
        `;

        if (noResults) {
            noResults.style.display = "none";
        }

    }


    /* =====================================================
       GET FILTERED ARTICLES
    ====================================================== */

    function getFilteredArticles() {

        const searchTerm = normalize(
            searchInput
                ? searchInput.value
                : ""
        );

        return allArticles.filter(function (article) {

            const category = normalize(
                article.category
            );

            const title = normalize(
                article.title
            );

            const description = normalize(
                article.description
            );

            const source = normalize(
                article.source
            );

            const combinedText =
                title +
                " " +
                description +
                " " +
                source +
                " " +
                category;


            const categoryMatch =
                currentCategory === "All" ||
                category === normalize(currentCategory);


            const searchMatch =
                searchTerm === "" ||
                combinedText.includes(searchTerm);


            return categoryMatch && searchMatch;

        });

    }


    /* =====================================================
       RENDER NEWS
    ====================================================== */

    function renderNews() {

        if (!newsGrid) {
            return;
        }

        const articles = getFilteredArticles();

        newsGrid.innerHTML = "";


        /* =================================================
           UPDATE FEATURED STORY
        ================================================== */

        updateFeaturedStory(articles);


        /* =================================================
           NO RESULTS
        ================================================== */

        if (articles.length === 0) {

            if (noResults) {
                noResults.style.display = "block";
            }

            updateStatus(0);

            return;

        }


        if (noResults) {
            noResults.style.display = "none";
        }


        /* =================================================
           CREATE NEWS CARDS
        ================================================== */

        articles.forEach(function (article) {

            const card = createNewsCard(article);

            newsGrid.appendChild(card);

        });


        updateStatus(articles.length);

    }


    /* =====================================================
       CREATE NEWS CARD
    ====================================================== */

    function createNewsCard(article) {

        const card = document.createElement("article");

        card.className = "ghana-news-card";

        card.dataset.category =
            article.category || "Ghana Technology";

        card.dataset.title =
            article.title || "";


        const image =
            article.image ||
            getFallbackImage(article.category);


        const title =
            escapeHTML(article.title);

        const description =
            escapeHTML(
                article.description ||
                "Read the latest technology story from Ghana."
            );

        const category =
            escapeHTML(
                article.category ||
                "Ghana Technology"
            );

        const source =
            escapeHTML(
                article.source ||
                "TechHub Ghana"
            );

        const date =
            formatDate(article.publishedAt);

        const url =
            getArticleURL(article);


        card.innerHTML = `

            <a
                href="${escapeHTML(url)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read ${title}"
            >

                <img
                    src="${escapeHTML(image)}"
                    alt="${title}"
                    loading="lazy"
                    decoding="async"
                    onerror="this.onerror=null;this.src='images/ghana-tech.jpg';"
                >

            </a>


            <div class="ghana-news-card-content">

                <span class="ghana-news-card-category">
                    ${category}
                </span>


                <h3>
                    ${title}
                </h3>


                <p>
                    ${description}
                </p>


                <div class="ghana-news-card-meta">

                    <span>
                        ${escapeHTML(source)}
                    </span>

                    <span>
                        ${escapeHTML(date)}
                    </span>

                </div>


                <div style="margin-top:12px;">

                    <a
                        class="read-more"
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        Read More

                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>

                    </a>

                </div>

            </div>

        `;


        return card;

    }


    /* =====================================================
       UPDATE FEATURED STORY
    ====================================================== */

    function updateFeaturedStory(articles) {

        if (!featured || articles.length === 0) {
            return;
        }

        const article = articles[0];

        const image =
            article.image ||
            getFallbackImage(article.category);

        const category =
            article.category ||
            "Ghana Technology";

        const title =
            article.title ||
            "Latest Ghana Technology News";

        const description =
            article.description ||
            "The latest technology developments and digital innovation from Ghana.";

        const source =
            article.source ||
            "TechHub Ghana";

        const date =
            formatDate(article.publishedAt);

        const url =
            getArticleURL(article);


        if (featuredImage) {

            featuredImage.src = image;

            featuredImage.alt =
                title;

        }


        if (featuredCategory) {

            featuredCategory.textContent =
                "🇬🇭 " + category;

        }


        if (featuredTitle) {

            featuredTitle.textContent =
                title;

        }


        if (featuredDescription) {

            featuredDescription.textContent =
                description;

        }


        if (featuredDate) {

            featuredDate.innerHTML = `
                <i
                    class="fa-regular fa-calendar"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(date)}
            `;

        }


        if (featuredAuthor) {

            featuredAuthor.innerHTML = `
                <i
                    class="fa-regular fa-building"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(source)}
            `;

        }


        if (featuredReadBtn) {

            if (url === "#") {

                featuredReadBtn.removeAttribute("target");

            } else {

                featuredReadBtn.target = "_blank";
                featuredReadBtn.rel =
                    "noopener noreferrer";

            }

            featuredReadBtn.href = url;

        }


        featured.style.display = "";

    }


    /* =====================================================
       UPDATE STATUS
    ====================================================== */

    function updateStatus(visibleArticles) {

        const totalArticles =
            allArticles.length;

        const searchTerm =
            searchInput
                ? searchInput.value.trim()
                : "";


        if (countElement) {

            countElement.textContent =
                visibleArticles;

        }


        if (!message) {
            return;
        }


        if (totalArticles === 0) {

            message.textContent =
                "No Ghana Tech stories are available right now.";

            return;

        }


        if (visibleArticles === 0) {

            message.textContent =
                "No Ghana Tech stories match your search.";

            return;

        }


        if (searchTerm !== "") {

            message.textContent =
                visibleArticles +
                " result" +
                (visibleArticles === 1 ? "" : "s") +
                ' found for "' +
                searchTerm +
                '".';

            return;

        }


        if (currentCategory !== "All") {

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

            return;

        }


        message.textContent =
            "Showing " +
            visibleArticles +
            " Ghana Tech stor" +
            (visibleArticles === 1
                ? "y."
                : "ies.");

    }


    /* =====================================================
       CATEGORY BUTTONS
    ====================================================== */

    filters.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filters.forEach(function (item) {

                    item.classList.remove("active");

                });


                button.classList.add("active");


                currentCategory =
                    button.dataset.category ||
                    "All";


                renderNews();

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

                renderNews();

            }
        );

    }


    /* =====================================================
       LOCAL SEARCH BUTTON
    ====================================================== */

    const localSearchButton =
        document.getElementById(
            "ghanaSearchBtn"
        );


    if (localSearchButton) {

        localSearchButton.addEventListener(
            "click",
            function () {

                renderNews();

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


        searchInput.value =
            value;


        currentCategory =
            "All";


        filters.forEach(function (button) {

            button.classList.remove("active");


            if (
                button.dataset.category === "All"
            ) {

                button.classList.add("active");

            }

        });


        renderNews();


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


                filters.forEach(function (button) {

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

                });


                if (searchInput) {
                    searchInput.value = "";
                }


                renderNews();

            }
        );

    });


    /* =====================================================
       LOAD NEWS
    ====================================================== */

    loadNews();

});
