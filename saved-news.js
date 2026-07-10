let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];


let container = document.getElementById("savedArticles");


if(savedArticles.length === 0){

container.innerHTML = `
<h3>No saved articles yet 🔖</h3>
`;

}

else{


savedArticles.forEach(article => {


container.innerHTML += `

<div class="news-card">

<img src="${article.image}">


<div>

<h3>
${article.title}
</h3>


<p>
${article.description}
</p>


<a href="${article.link}" class="read-btn">
Read Article
</a>


</div>

</div>

`;


});


}