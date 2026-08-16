let allNews = [];

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Load automatic news from news.json
async function loadNews() {

    if (!newsContainer) return;

    newsContainer.innerHTML = `
        <p>Loading latest technology news...</p>
    `;

    try {

        const response = await fetch("news.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unable to load news.json");
        }

        const data = await response.json();

        allNews = data.articles || [];

        // Sort newest first
        allNews.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        displayNews(allNews);

    } catch (error) {

        console.error("News loading error:", error);

        newsContainer.innerHTML = `
            <div class="error-box">
                <h3>Unable to load latest news.</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}


// Display news
function displayNews(newsList) {

    newsContainer.innerHTML = "";

    if (!newsList.length) {

        newsContainer.innerHTML = `
            <p>No news found.</p>
        `;

        return;
    }

    newsList.forEach(news => {

        const card = document.createElement("article");

        card.className = "news-card";

        card.innerHTML = `

            <div class="news-content">

                <span class="category">
                    ${escapeHTML(news.category || "Technology")}
                </span>

                <h3>
                    ${escapeHTML(news.title || "Untitled")}
                </h3>

                <p>
                    ${cleanSummary(news.summary || "")}
                </p>

                <small>
                    📅 ${formatDate(news.date)}
                    |
                    📰 ${escapeHTML(news.source || "TechHub Ghana")}
                </small>

                <br><br>

                <a
                    href="${escapeAttribute(news.link)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="read-btn"
                >
                    Read More →
                </a>

            </div>

        `;

        newsContainer.appendChild(card);

    });
}


// Search
function searchNews() {

    if (!searchInput) return;

    const keyword =
        searchInput.value.trim().toLowerCase();

    if (!keyword) {

        displayNews(allNews);

        return;
    }

    const filtered = allNews.filter(news => {

        const title =
            (news.title || "").toLowerCase();

        const summary =
            (news.summary || "").toLowerCase();

        const category =
            (news.category || "").toLowerCase();

        const source =
            (news.source || "").toLowerCase();

        return (
            title.includes(keyword) ||
            summary.includes(keyword) ||
            category.includes(keyword) ||
            source.includes(keyword)
        );

    });

    displayNews(filtered);
}


// Category filter
window.filterNews = function(category) {

    if (category === "all") {

        displayNews(allNews);

        return;
    }

    const filtered = allNews.filter(news =>
        news.category === category
    );

    displayNews(filtered);
};


// Format date
function formatDate(dateString) {

    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
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


// Remove HTML from RSS summaries
function cleanSummary(text) {

    const temp = document.createElement("div");

    temp.innerHTML = text;

    return escapeHTML(
        temp.textContent || temp.innerText || ""
    );
}


// Security: protect displayed text
function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// Security: protect links
function escapeAttribute(text) {

    return String(text)
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// Search events
if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchNews
    );

}

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchNews
    );

}


// Start
loadNews();
