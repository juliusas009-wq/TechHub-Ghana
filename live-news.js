import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

let allNews = [];

// ================= LOAD NEWS =================

async function loadNews() {

    newsContainer.innerHTML = `
        <div class="loading">
            <h3>Loading latest technology news...</h3>
        </div>
    `;

    try {

        const snapshot = await getDocs(collection(db, "news"));

        allNews = [];

        snapshot.forEach((doc) => {

            allNews.push(doc.data());

        });

        displayNews(allNews);

    }

    catch (error) {

        console.error(error);

        newsContainer.innerHTML = `

        <div class="error-box">

            <h3>Unable to load news.</h3>

            <p>Please try again later.</p>

        </div>

        `;

    }

}

// ================= DISPLAY =================

function displayNews(newsArray) {

    newsContainer.innerHTML = "";

    if (newsArray.length === 0) {

        newsContainer.innerHTML = `

        <div class="empty">

            <h3>No news available.</h3>

        </div>

        `;

        return;

    }

    newsArray.forEach(news => {

        newsContainer.innerHTML += `

        <div class="news-card">

            <img src="${news.image}" alt="${news.title}">

            <div class="news-content">

                <span class="category">

                    ${news.category}

                </span>

                <h3>

                    ${news.title}

                </h3>

                <p>

                    ${news.summary}

                </p>

                <small>

                    📅 ${news.date}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
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

// ================= SEARCH =================

function searchNews() {

    const keyword = searchInput.value.toLowerCase();

    const filtered = allNews.filter(news =>

        news.title.toLowerCase().includes(keyword) ||

        news.summary.toLowerCase().includes(keyword) ||

        news.category.toLowerCase().includes(keyword)

    );

    displayNews(filtered);

}

// ================= FILTER =================

window.filterNews = function(category) {

    if (category === "all") {

        displayNews(allNews);

        return;

    }

    const filtered = allNews.filter(news =>

        news.category === category

    );

    displayNews(filtered);

}

// ================= SEARCH BUTTON =================

if (searchInput) {

    searchInput.addEventListener("keyup", searchNews);

}

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", searchNews);

}

// ================= START =================

loadNews();