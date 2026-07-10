// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// News container
const newsContainer = document.getElementById("newsContainer");


// Load news
async function loadNews(){

    try{

        const newsQuery = query(
            collection(db, "news"),
            orderBy("date", "desc")
        );


        const querySnapshot = await getDocs(newsQuery);


        newsContainer.innerHTML = "";


        if(querySnapshot.empty){

            newsContainer.innerHTML =
            "<p>No news available.</p>";

            return;
        }


        querySnapshot.forEach((doc)=>{


            const article = doc.data();


            newsContainer.innerHTML += `

            <div class="news-card">

                <img src="${article.image}" 
                alt="news image">


                <h3>${article.title}</h3>


                <p>
                ${article.description}
                </p>


                <small>
                ${article.date}
                </small>


            </div>

            `;


        });


    }
    catch(error){

        console.log(error);

        newsContainer.innerHTML =
        "<p>Failed to load news.</p>";
    }

}


loadNews();