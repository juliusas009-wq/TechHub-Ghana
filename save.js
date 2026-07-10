function saveArticle(){


let article = {

title:"Artificial Intelligence Is Transforming Education",

description:"AI tools are changing how students learn.",

image:"images/ai-news.jpg",

link:"ai-education.html"

};


let saved = JSON.parse(localStorage.getItem("savedArticles")) || [];


saved.push(article);


localStorage.setItem(
"savedArticles",
JSON.stringify(saved)
);


alert("Article saved successfully 🔖");


}