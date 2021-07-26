// Fichier js de la page catalogue


// url de base de la page produit
var urlProduct = new URL("file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/produit.html")



main()

/** Fonction main */
async function main() {
    const articles = await getArticles()
    console.log(articles)

    for (article of articles)
    displayArticle(article)
}

/** Récupération des données du serveur */
function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error)
    {
        alert(error)
    })
}

/** Affichage des articles 
 * @param {var} article - article du serveur.
*/
function displayArticle(article) {

    const templateElt = document.getElementById("templateArticle")

    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cardName").textContent = article.name
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardPrice").textContent = displayInEUR(article.price)

    cloneElt.getElementById("seeProduct").addEventListener("click", function(){
        window.location.href = `./produit.html?id=${article._id}`; 
    })

    document.getElementById("start").appendChild(cloneElt)
}

/** Affichage des valeurs numériques en EUR */
function displayInEUR (prix) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix/100);
}