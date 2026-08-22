/* =========================================================
   TECHHUB GHANA
   GHANA TECH LIVE NEWS
   SEARCH + FILTER + FEATURED STORY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const newsGrid =
        document.getElementById("ghanaNewsGrid");

    const searchInput =
        document.getElementById("ghanaSearch");

    const searchButton =
        document.getElementById("ghanaSearchBtn");

    const filters =
        document.querySelectorAll(".ghana-filter");

    const searchMessage =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("noGhanaNews");

    const newsCount =
        document.getElementById("ghanaNewsCount");

    const liveStatus =
        document.getElementById("liveStatusText");

    const featuredImage =
        document.getElementById("featuredImage");

    const featuredCategory =
        document.getElementById("featuredCategory");

    const featuredTitle =
        document.getElementById("featuredTitle");

    const featuredDescription =
        document.getElementById("featuredDescription");

    const featuredDate =
        document.getElementById("featuredDate");

    const featuredAuthor =
        document.getElementById("featuredAuthor");

    const featuredReadButton =
        document.getElementById("featuredReadBtn");


    /* =====================================================
       STATE
    ===================================================== */

    let allNews = [];

    let currentCategory = "All";

    let currentSearch = "";


    /* =====================================================
       NEWS SOURCES
       
       The JavaScript first tries to load:
       
       1. ghana-tech-news.json
       
       This allows GitHub Pages / GitHub Actions to
       provide automatically updated news.

       If the file is unavailable, a safe fallback
       message is displayed.
    ===================================================== */

    const NEWS_FILE = "ghana-tech-news.json";


    /* =====================================================
       LOADING STATE
    ===================================================== */

    function showLoading() {

        if (!newsGrid) {
            return;
        }


        newsGrid.innerHTML = `
            <div class="news-loading">

                <div
                    class="loading-spinner"
                    aria-hidden="true"
                ></div>

                <p>
                    Loading latest Ghana technology news...
                </p>

            </div>
        `;


        if (noResults) {
            noResults.hidden = true;
        }

    }


    /* =====================================================
       ERROR STATE
    ===================================================== */

    function showError(messageText) {

        if (!newsGrid) {
            return;
        }


        newsGrid.innerHTML = `
            <div class="news-loading">

                <div
                    style="font-size:45px;margin-bottom:15px;"
                    aria-hidden="true"
                >
                    ⚠️
                </div>

                <h3>
                    Unable to load Ghana Tech News
                </h3>

                <p>
                    ${escapeHTML(messageText)}
                </p>

                <button
                    type="button"
                    id="retryGhanaNews"
                    class="ghana-primary-btn"
                    style="margin-top:20px;border:0;cursor:pointer;"
                >
                    Try Again
                </button>

            </div>
        `;


        const retryButton =
            document.getElementById("retryGhanaNews");


        if (retryButton) {

            retryButton.addEventListener(
                "click",
                loadNews
            );

        }


        if (liveStatus) {

            liveStatus.textContent =
                "News connection unavailable";

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }


        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "Today";
        }


        const date =
            new Date(dateValue);


        if (Number.isNaN(date.getTime())) {
            return String(dateValue);
        }


        return new Intl.DateTimeFormat(
            "en-GH",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        ).format(date);

    }


    /* =====================================================
       NORMALIZE NEWS DATA
    ===================================================== */

    function normalizeNews(data) {

        let articles = [];


        if (Array.isArray(data)) {

            articles = data;

        } else if (
            data &&
            Array.isArray(data.articles)
        ) {

            articles = data.articles;

        } else if (
            data &&
            Array.isArray(data.news)
        ) {

            articles = data.news;

        }


        return articles
            .map(function (article, index) {

                if (!article) {
                    return null;
                }


                const title =
                    article.title ||
                    article.name ||
                    "Ghana Technology News";


                const description =
                    article.description ||
                    article.summary ||
                    article.content ||
                    "Latest technology news and digital innovation relevant to Ghana.";


                const image =
                    article.image ||
                    article.urlToImage ||
                    article.thumbnail ||
                    "images/ghana-tech.jpg";


                const category =
                    article.category ||
                    article.categories ||
                    "Ghana Technology";


                const url =
                    article.url ||
                    article.link ||
                    article.sourceUrl ||
                    "#";


                const date =
                    article.date ||
                    article.publishedAt ||
                    article.published ||
                    article.pubDate ||
                    "";


                const author =
                    article.author ||
                    article.source ||
                    "TechHub Ghana";


                return {

                    id:
                        article.id ||
                        "ghana-tech-" + index,

                    title:
                        String(title),

                    description:
                        String(description),

                    image:
                        String(image),

                    category:
                        Array.isArray(category)
                            ? category.join(", ")
                            : String(category),

                    url:
                        String(url),

                    date:
                        date,

                    author:
                        String(author)

                };

            })
            .filter(Boolean);

    }


    /* =====================================================
       CATEGORY MATCHING
    ===================================================== */

    function categoryMatches(article) {

        if (
            currentCategory === "All" ||
            currentCategory === ""
        ) {

            return true;

        }


        const articleCategory =
            String(article.category || "")
                .toLowerCase();


        const selectedCategory =
            String(currentCategory)
                .toLowerCase();


        return (
            articleCategory.includes(
                selectedCategory
            ) ||
            selectedCategory.includes(
                articleCategory
            )
        );

    }


    /* =====================================================
       SEARCH MATCHING
    ===================================================== */

    function searchMatches(article) {

        if (!currentSearch) {
            return true;
        }


        const searchText =
            (
                article.title +
                " " +
                article.description +
                " " +
                article.category +
                " " +
                article.author
            )
                .toLowerCase();


        return searchText.includes(
            currentSearch
        );

    }


    /* =====================================================
       GET FILTERED NEWS
    ===================================================== */

    function getFilteredNews() {

        return allNews.filter(
            function (article) {

                return (
                    categoryMatches(article) &&
                    searchMatches(article)
                );

            }
        );

    }


    /* =====================================================
       CREATE NEWS CARD
    ===================================================== */

    function createNewsCard(article) {

        const card =
            document.createElement("article");


        card.className =
            "ghana-news-card";


        card.dataset.category =
            article.category;


        card.dataset.title =
            article.title;


        const safeTitle =
            escapeHTML(article.title);


        const safeDescription =
            escapeHTML(
                article.description
            );


        const safeCategory =
            escapeHTML(article.category);


        const safeAuthor =
            escapeHTML(article.author);


        const safeDate =
            escapeHTML(
                formatDate(article.date)
            );


        const safeImage =
            escapeHTML(article.image);


        const safeUrl =
            escapeHTML(article.url);


        card.innerHTML = `

            <div class="ghana-news-card-image">

                <img
                    src="${safeImage}"
                    alt="${safeTitle}"
                    loading="lazy"
                    decoding="async"
                    onerror="this.onerror=null;this.src='images/ghana-tech.jpg';"
                >

            </div>


            <div class="ghana-news-card-content">

                <span class="ghana-news-card-category">
                    ${safeCategory}
                </span>


                <h3>
                    ${safeTitle}
                </h3>


                <p>
                    ${safeDescription}
                </p>


                <div class="article-info">

                    <span>

                        <i
                            class="fa-regular fa-calendar"
                            aria-hidden="true"
                        ></i>

                        ${safeDate}

                    </span>


                    <span>

                        <i
                            class="fa-regular fa-user"
                            aria-hidden="true"
                        ></i>

                        ${safeAuthor}

                    </span>

                </div>


                <a
                    href="${safeUrl}"
                    class="read-btn"
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

        `;


        return card;

    }


    /* =====================================================
       RENDER NEWS
    ===================================================== */

    function renderNews() {

        if (!newsGrid) {
            return;
        }


        const filteredNews =
            getFilteredNews();


        newsGrid.innerHTML = "";


        if (newsCount) {

            newsCount.textContent =
                filteredNews.length;

        }


        if (filteredNews.length === 0) {

            if (noResults) {
                noResults.hidden = false;
            }


            updateSearchMessage(0);


            return;

        }


        if (noResults) {
            noResults.hidden = true;
        }


        const fragment =
            document.createDocumentFragment();


        filteredNews.forEach(
            function (article) {

                fragment.appendChild(
                    createNewsCard(article)
                );

            }
        );


        newsGrid.appendChild(
            fragment
        );


        updateSearchMessage(
            filteredNews.length
        );

    }


    /* =====================================================
       UPDATE SEARCH MESSAGE
    ===================================================== */

    function updateSearchMessage(count) {

        if (!searchMessage) {
            return;
        }


        if (
            currentSearch === "" &&
            currentCategory === "All"
        ) {

            searchMessage.textContent =
                count +
                " Ghana Tech stories available.";

            return;

        }


        if (count === 0) {

            searchMessage.textContent =
                "No Ghana Tech stories match your search.";

            return;

        }


        if (currentSearch !== "") {

            searchMessage.textContent =
                count +
                " result(s) found for \"" +
                currentSearch +
                "\".";

            return;

        }


        searchMessage.textContent =
            count +
            " story/stories in " +
            currentCategory +
            ".";

    }


    /* =====================================================
       UPDATE FEATURED STORY
    ===================================================== */

    function updateFeatured() {

        if (!allNews.length) {
            return;
        }


        const article =
            getFilteredNews()[0] ||
            allNews[0];


        if (!article) {
            return;
        }


        if (featuredImage) {

            featuredImage.src =
                article.image ||
                "images/ghana-tech.jpg";

            featuredImage.alt =
                article.title;

        }


        if (featuredCategory) {

            featuredCategory.textContent =
                "🇬🇭 " +
                article.category;

        }


        if (featuredTitle) {

            featuredTitle.textContent =
                article.title;

        }


        if (featuredDescription) {

            featuredDescription.textContent =
                article.description;

        }


        if (featuredDate) {

            featuredDate.innerHTML = `

                <i
                    class="fa-regular fa-calendar"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(
                    formatDate(article.date)
                )}

            `;

        }


        if (featuredAuthor) {

            featuredAuthor.innerHTML = `

                <i
                    class="fa-regular fa-user"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(
                    article.author
                )}

            `;

        }


        if (featuredReadButton) {

            if (
                article.url &&
                article.url !== "#"
            ) {

                featuredReadButton.href =
                    article.url;

                featuredReadButton.target =
                    "_blank";

                featuredReadButton.rel =
                    "noopener noreferrer";

            } else {

                featuredReadButton.href =
                    "#ghanaNews";

                featuredReadButton.removeAttribute(
                    "target"
                );

                featuredReadButton.removeAttribute(
                    "rel"
                );

            }

        }

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filters.forEach(
        function (button) {

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


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category ||
                        "All";


                    renderNews();

                    updateFeatured();

                }
            );

        }
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    function performSearch() {

        if (!searchInput) {
            return;
        }


        currentSearch =
            searchInput.value
                .toLowerCase()
                .trim();


        renderNews();

        updateFeatured();

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       HEADER SEARCH
       Uses the main Ghana Tech search field.
    ===================================================== */

    const headerSearch =
        document.getElementById(
            "siteSearch"
        );


    const headerSearchForm =
        document.getElementById(
            "searchForm"
        );


    function performHeaderSearch() {

        if (!headerSearch || !searchInput) {
            return;
        }


        const value =
            headerSearch.value.trim();


        if (!value) {
            return;
        }


        searchInput.value =
            value;


        performSearch();


        const newsSection =
            document.getElementById(
                "ghanaNews"
            );


        if (newsSection) {

            newsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    if (headerSearchForm) {

        headerSearchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                performHeaderSearch();

            }
        );

    }


    /* =====================================================
       TRENDING LINKS
    ===================================================== */

    const trendingLinks =
        document.querySelectorAll(
            "[data-trending]"
        );


    trendingLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    const topic =
                        link.dataset.trending ||
                        "";


                    const matchingFilter =
                        Array.from(filters)
                            .find(
                                function (button) {

                                    return (
                                        button.dataset.category
                                            .toLowerCase()
                                            .includes(
                                                topic.toLowerCase()
                                            )
                                    );

                                }
                            );


                    if (matchingFilter) {

                        matchingFilter.click();

                    } else if (searchInput) {

                        searchInput.value =
                            topic;

                        performSearch();

                    }

                }
            );

        }
    );


    /* =====================================================
       LOAD NEWS
    ===================================================== */

    async function loadNews() {

        showLoading();


        if (liveStatus) {

            liveStatus.textContent =
                "Connecting to live Ghana Tech News...";

        }


        try {

            const response =
                await fetch(
                    NEWS_FILE +
                    "?t=" +
                    Date.now(),
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "News file returned HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            allNews =
                normalizeNews(data);


            if (!allNews.length) {

                throw new Error(
                    "No Ghana technology stories were found."
                );

            }


            if (liveStatus) {

                liveStatus.textContent =
                    "Live Ghana Tech News connected";

            }


            renderNews();

            updateFeatured();


        } catch (error) {

            console.error(
                "TechHub Ghana live news error:",
                error
            );


            showError(
                "Please check your internet connection or try again."
            );

        }

    }


    /* =====================================================
       AUTO REFRESH
       
       Refreshes the JSON data every 15 minutes.
    ===================================================== */

    setInterval(
        loadNews,
        15 * 60 * 1000
    );


    /* =====================================================
       START
    ===================================================== */

    loadNews();

});
