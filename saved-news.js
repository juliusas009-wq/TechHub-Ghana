/* =========================================================
   TECHHUB GHANA
   SAVED NEWS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("savedArticles");

    if (!container) return;


    let savedArticles =
        JSON.parse(
            localStorage.getItem("savedArticles")
        ) || [];


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    if (savedArticles.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔖</div>

                <h3>No saved articles yet</h3>

                <p>
                    Articles you save will appear here.
                </p>

                <a href="news.html" class="read-btn">
                    Browse News
                </a>
            </div>
        `;

        return;
    }


    /* =====================================================
       DISPLAY ARTICLES
    ===================================================== */

    container.innerHTML = savedArticles.map(
        (article, index) => `

        <article class="news-card saved-card">

            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
                onerror="this.src='images/logo.png'"
            >

            <div class="saved-card-content">

                <h3>
                    ${escapeHTML(article.title)}
                </h3>

                <p>
                    ${escapeHTML(article.description)}
                </p>

                <div class="saved-actions">

                    <a
                        href="${escapeHTML(article.link)}"
                        class="read-btn">

                        Read Article →

                    </a>

                    <button
                        class="delete-save-btn"
                        data-index="${index}">

                        🗑 Remove

                    </button>

                </div>

            </div>

        </article>

        `
    ).join("");


    /* =====================================================
       REMOVE SAVED ARTICLE
    ===================================================== */

    document.querySelectorAll(".delete-save-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                savedArticles.splice(index, 1);

                localStorage.setItem(
                    "savedArticles",
                    JSON.stringify(savedArticles)
                );

                location.reload();

            });

        });

});


/* =========================================================
   BASIC HTML ESCAPING
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;

                                    }
