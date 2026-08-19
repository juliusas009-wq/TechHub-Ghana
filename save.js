/* =========================================================
   TECHHUB GHANA
   SAVE ARTICLE SYSTEM
========================================================= */

function saveArticle(article) {

    if (!article || !article.title) {
        alert("Unable to save this article.");
        return;
    }

    let savedArticles =
        JSON.parse(
            localStorage.getItem("savedArticles")
        ) || [];


    // Prevent duplicates
    const alreadySaved =
        savedArticles.some(
            saved => saved.link === article.link
        );


    if (alreadySaved) {

        alert("This article is already saved 🔖");

        return;
    }


    savedArticles.push({
        title: article.title,
        description: article.description || "",
        image: article.image || "images/logo.png",
        link: article.link,
        date: article.date || new Date().toLocaleDateString()
    });


    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );


    alert("Article saved successfully 🔖");

}
