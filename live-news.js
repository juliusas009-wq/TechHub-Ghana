import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allNews = [];

// Load news from Firestore
async function loadNews() {

    newsContainer.innerHTML = "<p>Loading latest news...</p>";

    try {

        const snapshot = await getDocs(collection(db, "news"));

        allNews = [];

        snapshot.forEach((doc) => {
            allNews.push(doc.data());
        });

        displayNews(allNews);

    } catch (error) {

        console.error("Firestore Error:", error);

        newsContainer.innerHTML = `
            <div class="error-box">
                <h3>Unable to load news.</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Display news
function displayNews(newsList) {

    newsContainer.innerHTML = "";

    if (newsList.length === 0) {
        newsContainer.innerHTML = "<p>No news found.</p>";
        return;
    }

    newsList.forEach(news => {

        newsContainer.innerHTML += `
            <div class="news-card">

                <img src="${news.image}" alt="${news.title}">

                <div class="news-content">

                    <span>${news.category}</span>

                    <h3>${news.title}</h3>

                    <p>${news.summary}</p>

                    <small>
                        📅 ${news.date} |
                        ✍ ${news.author}
                    </small>

                    <br><br>

                    <a href="${news.link}" class="read-btn">
                        Read More →
                    </a>

                </div>

            </div>
        `;

    });

}

// Search
function searchNews() {

    if (!searchInput) return;

    const keyword = searchInput.value.toLowerCase();

    const filtered = allNews.filter(news =>
        news.title.toLowerCase().includes(keyword) ||
        news.summary.toLowerCase().includes(keyword) ||
        news.category.toLowerCase().includes(keyword)
    );

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

// Search events
if (searchInput) {
    searchInput.addEventListener("keyup", searchNews);
}

if (searchBtn) {
    searchBtn.addEventListener("click", searchNews);
}

// Start
loadNews();