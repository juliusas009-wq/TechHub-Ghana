/* =========================================================
   TECHHUB GHANA
   SAVED ARTICLES
========================================================= */

function saveArticle(article = null) {

    /* Default article */

    if (!article) {

        article = {

            title:
                "Artificial Intelligence Is Transforming Education",

            description:
                "AI tools are changing how students learn.",

            image:
                "images/ai-news.jpg",

            link:
                "ai-education.html"

        };

    }


    /* Get existing saved articles */

    let savedArticles =
        JSON.parse(
            localStorage.getItem("savedArticles")
        ) || [];


    /* Prevent duplicates */

    const alreadySaved =
        savedArticles.some(function (saved) {

            return saved.link === article.link;

        });


    if (alreadySaved) {

        alert(
            "This article is already saved 🔖"
        );

        return;

    }


    /* Save article */

    savedArticles.push(article);


    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );


    alert(
        "Article saved successfully 🔖"
    );

}


/* =========================================================
   REMOVE SAVED ARTICLE
========================================================= */

function removeSavedArticle(index) {

    let savedArticles =
        JSON.parse(
            localStorage.getItem("savedArticles")
        ) || [];


    savedArticles.splice(index, 1);


    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );


    if (
        typeof loadSavedArticles ===
        "function"
    ) {

        loadSavedArticles();

    }

}
