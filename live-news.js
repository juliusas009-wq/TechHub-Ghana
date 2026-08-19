/* =========================================================
   TECHHUB GHANA
   NEWS SYSTEM
   Loads automatic news from news.json
========================================================= */

"use strict";


/* =========================================================
   GLOBAL DATA
========================================================= */

let allNews = [];

let currentCategory = "all";

let currentSearch = "";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const newsContainer =
    document.getElementById("newsContainer");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


/* =========================================================
   LOAD NEWS
========================================================= */

async function loadNews() {

    if (!newsContainer) {
        console.warn(
            "TechHub Ghana: #newsContainer was not found."
        );

        return;
    }


    newsContainer.innerHTML = `
        <div class="news-loading">
            <div class="loading-spinner"></div>

            <p>
                Loading latest technology news...
            </p>
        </div>
    `;


    try {

        const response = await fetch(
            "news.json",
            {
                cache: "no-store"
            }
        );


        if (!response.ok) {

            throw new Error(
                `News request failed: ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !Array.isArray(data.articles)
        ) {

            throw new Error(
                "Invalid news.json format."
            );

        }


        /* -----------------------------------------
           CLEAN NEWS DATA
        ----------------------------------------- */

        allNews = data.articles
            .filter(article => article)
            .map(article => ({

                title:
                    article.title || "Untitled Technology News",

                summary:
                    article.summary ||
                    article.description ||
                    "",

                category:
                    article.category ||
                    "Technology",

                source:
                    article.source ||
                    "TechHub Ghana",

                date:
                    article.date ||
                    "",

                link:
                    article.link ||
                    "",

                image:
                    article.image ||
                    article.imageUrl ||
                    ""

            }));


        /* -----------------------------------------
           REMOVE DUPLICATES
        ----------------------------------------- */

        const uniqueNews = [];

        const seen = new Set();


        allNews.forEach(article => {

            const uniqueKey =
                (
                    article.title +
                    "|" +
                    article.link
                ).toLowerCase();


            if (!seen.has(uniqueKey)) {

                seen.add(uniqueKey);

                uniqueNews.push(article);

            }

        });


        allNews = uniqueNews;


        /* -----------------------------------------
           SORT NEWEST FIRST
        ----------------------------------------- */

        allNews.sort((a, b) => {

            const dateA =
                getTimestamp(a.date);

            const dateB =
                getTimestamp(b.date);

            return dateB - dateA;

        });


        /* -----------------------------------------
           DISPLAY
        ----------------------------------------- */

        applyFilters();


    } catch (error) {

        console.error(
            "TechHub Ghana news loading error:",
            error
        );


        newsContainer.innerHTML = `

            <div class="error-box">

                <h3>
                    ⚠️ Unable to load latest news
                </h3>

                <p>
                    We couldn't load the technology news
                    right now.
                </p>

                <button
                    type="button"
                    class="read-btn"
                    onclick="loadNews()"
                >
                    🔄 Try Again
                </button>

            </div>

        `;

    }

}


/* =========================================================
   APPLY SEARCH + CATEGORY FILTER
========================================================= */

function applyFilters() {

    let filteredNews = [...allNews];


    /* -----------------------------------------
       CATEGORY FILTER
    ----------------------------------------- */

    if (
        currentCategory &&
        currentCategory.toLowerCase() !== "all"
    ) {

        const selectedCategory =
            currentCategory
                .trim()
                .toLowerCase();


        filteredNews =
            filteredNews.filter(article => {

                const articleCategory =
                    String(article.category || "")
                        .trim()
                        .toLowerCase();


                return (
                    articleCategory ===
                    selectedCategory
                );

            });

    }


    /* -----------------------------------------
       SEARCH FILTER
    ----------------------------------------- */

    if (currentSearch) {

        const keyword =
            currentSearch
                .trim()
                .toLowerCase();


        filteredNews =
            filteredNews.filter(article => {

                const title =
                    String(article.title || "")
                        .toLowerCase();


                const summary =
                    String(article.summary || "")
                        .toLowerCase();


                const category =
                    String(article.category || "")
                        .toLowerCase();


                const source =
                    String(article.source || "")
                        .toLowerCase();


                return (

                    title.includes(keyword) ||

                    summary.includes(keyword) ||

                    category.includes(keyword) ||

                    source.includes(keyword)

                );

            });

    }


    displayNews(filteredNews);

}


/* =========================================================
   DISPLAY NEWS
========================================================= */

function displayNews(newsList) {

    if (!newsContainer) return;


    newsContainer.innerHTML = "";


    /* -----------------------------------------
       NO RESULTS
    ----------------------------------------- */

    if (!Array.isArray(newsList) || !newsList.length) {

        newsContainer.innerHTML = `

            <div class="error-box">

                <h3>
                    🔎 No news found
                </h3>

                <p>
                    Try another search term or category.
                </p>

                <button
                    type="button"
                    class="read-btn"
                    onclick="clearNewsFilters()"
                >
                    Show All News
                </button>

            </div>

        `;

        return;

    }


    /* -----------------------------------------
       CREATE NEWS CARDS
    ----------------------------------------- */

    newsList.forEach(news => {


        const card =
            document.createElement("article");


        card.className =
            "news-card";


        /* -----------------------------------------
           IMAGE
        ----------------------------------------- */

        let imageHTML = "";


        if (news.image) {

            imageHTML = `

                <div class="news-image">

                    <img
                        src="${safeURL(news.image)}"
                        alt="${escapeHTML(news.title)}"
                        loading="lazy"
                        onerror="this.parentElement.style.display='none';"
                    >

                </div>

            `;

        }


        /* -----------------------------------------
           LINK
        ----------------------------------------- */

        const articleLink =
            safeURL(news.link);


        let readMoreHTML = "";


        if (articleLink) {

            readMoreHTML = `

                <a
                    href="${articleLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="read-btn"
                >
                    Read More →
                </a>

            `;

        }


        /* -----------------------------------------
           CARD CONTENT
        ----------------------------------------- */

        card.innerHTML = `

            ${imageHTML}


            <div class="news-content">


                <span class="category">

                    ${escapeHTML(
                        news.category ||
                        "Technology"
                    )}

                </span>


                <h3>

                    ${escapeHTML(
                        news.title ||
                        "Untitled Technology News"
                    )}

                </h3>


                <p>

                    ${cleanSummary(
                        news.summary ||
                        "Read the latest technology news."
                    )}

                </p>


                <div class="news-meta">

                    <span>
                        📅 ${formatDate(news.date)}
                    </span>

                    <span>
                        📰 ${escapeHTML(
                            news.source ||
                            "TechHub Ghana"
                        )}
                    </span>

                </div>


                ${readMoreHTML}


            </div>

        `;


        newsContainer.appendChild(card);

    });

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

window.filterNews = function(category) {

    currentCategory =
        category || "all";


    /* -----------------------------------------
       Update active category button
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".category-btn, .category-button"
        )
        .forEach(button => {

            const buttonCategory =
                (
                    button.dataset.category ||
                    button.textContent ||
                    ""
                )
                .trim()
                .toLowerCase();


            const selectedCategory =
                String(currentCategory)
                    .trim()
                    .toLowerCase();


            button.classList.toggle(
                "active",
                buttonCategory ===
                selectedCategory
            );

        });


    applyFilters();

};


/* =========================================================
   SEARCH
========================================================= */

function searchNews() {

    if (!searchInput) return;


    currentSearch =
        searchInput.value.trim();


    applyFilters();

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

window.clearNewsFilters = function() {

    currentCategory = "all";

    currentSearch = "";


    if (searchInput) {

        searchInput.value = "";

    }


    applyFilters();

};


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "Date unavailable";

    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return escapeHTML(
            String(dateString)
        );

    }


    return date.toLocaleDateString(
        "en-GH",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================================
   GET DATE TIMESTAMP
========================================================= */

function getTimestamp(dateString) {

    if (!dateString) {

        return 0;

    }


    const timestamp =
        new Date(dateString).getTime();


    return isNaN(timestamp)
        ? 0
        : timestamp;

}


/* =========================================================
   CLEAN NEWS SUMMARY
========================================================= */

function cleanSummary(text) {

    const temp =
        document.createElement("div");


    temp.innerHTML =
        String(text);


    const cleanText =
        temp.textContent ||
        temp.innerText ||
        "";


    return escapeHTML(
        cleanText.trim()
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   SAFE URL
========================================================= */

function safeURL(url) {

    if (!url) {

        return "";

    }


    try {

        const parsed =
            new URL(
                String(url),
                window.location.href
            );


        /* -----------------------------------------
           Only allow safe protocols
        ----------------------------------------- */

        const allowedProtocols = [
            "http:",
            "https:"
        ];


        if (
            !allowedProtocols.includes(
                parsed.protocol
            )
        ) {

            return "";

        }


        return escapeHTML(
            parsed.href
        );


    } catch (error) {

        return "";

    }

}


/* =========================================================
   SEARCH EVENTS
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchNews
    );

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            searchNews();

        }
    );

}


/* =========================================================
   SEARCH FORM SUPPORT
========================================================= */

const searchForm =
    document.querySelector(
        ".search-box"
    );


if (searchForm) {

    searchForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            searchNews();

        }
    );

}


/* =========================================================
   START NEWS SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadNews();

    }
);
