/* =========================================================
   TECHHUB GHANA
   SAVED NEWS PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadSavedArticles
);


function loadSavedArticles() {

    const container =
        document.getElementById(
            "savedArticles"
        );


    if (!container) return;


    const savedArticles =
        JSON.parse(
            localStorage.getItem(
                "savedArticles"
            )
        ) || [];


    container.innerHTML = "";


    /* No articles */

    if (savedArticles.length === 0) {

        container.innerHTML = `

            <div class="article-page">

                <h2>
                    🔖 No Saved Articles
                </h2>

                <p>
                    You haven't saved any articles yet.
                </p>

                <a
                    href="news.html"
                    class="read-btn"
                >
                    Browse News
                </a>

            </div>

        `;

        return;

    }


    /* Display articles */

    savedArticles.forEach(
        function (article, index) {

            const card =
                document.createElement("div");

            card.className =
                "news-card";


            card.innerHTML = `

                <img
                    src="${escapeHTML(article.image)}"
                    alt="${escapeHTML(article.title)}"
                    onerror="this.src='images/logo.png'"
                >

                <div>

                    <h3>
                        ${escapeHTML(article.title)}
                    </h3>

                    <p>
                        ${escapeHTML(article.description)}
                    </p>

                    <a
                        href="${escapeHTML(article.link)}"
                        class="read-btn"
                    >
                        Read Article
                    </a>

                    <button
                        type="button"
                        class="read-btn"
                        style="margin-left:8px;background:#dc2626;"
                        onclick="deleteSavedArticle(${index})"
                    >
                        Remove
                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   DELETE
========================================================= */

function deleteSavedArticle(index) {

    let savedArticles =
        JSON.parse(
            localStorage.getItem(
                "savedArticles"
            )
        ) || [];


    savedArticles.splice(index, 1);


    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );


    loadSavedArticles();

}


/* =========================================================
   SECURITY HELPER
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;

                                           }
