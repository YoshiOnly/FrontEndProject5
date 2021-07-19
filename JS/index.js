let test = "test"
var cardCount = 1
var binaryCount = 0

var urlProduct = new URL("file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/produit.html")



main()

async function main() {
    const articles = await getArticles()
    console.log(articles)

    for (article of articles)
    displayArticle(article)
}

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

function displayArticle(article) {

    const templateElt = document.getElementById("templateArticle")

    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cardName").textContent = article.name
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardPrice").textContent = displayInEUR(article.price)

    var eltNumber = cardCount -= 1

    cloneElt.getElementById("seeProduct").addEventListener("click", function(){
        window.location.href = `file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/produit.html?id=${article._id}`;
    })
    cardCount++

    document.getElementById("start").appendChild(cloneElt)

}

function displayInEUR (prix) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix/100);
}