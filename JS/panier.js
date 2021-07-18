var cardCount = 1
var KeyNames = [];

var totalPrice = 0;

let commandForm = ["firstName" , "lastName" , "adress", "city", "email"]


main()

confirmOrder()

async function main() {

    //recupération des données
    const articles = await getArticles()
    console.log(articles)

    for (article of articles)
    checkArticle(article)
    
    checkPrice()
}

function checkArticle(article) {
    for (i = 0; i < sessionStorage.length ; i++) {
        var key = sessionStorage.key(i)
        if( article._id == sessionStorage.getItem(key) && key != "product"){
            var articleQuantity = sessionStorage.getItem(`${key}-quantity`)
            displayArticle(article, articleQuantity)
        }
    }
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

function displayArticle(article, articleQuantity) {

    const templateElt = document.getElementById("templateArticle")

    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cardName").textContent = article.name
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardDescription").textContent = article.description

    cloneElt.getElementById("cardPrice").textContent = `${displayInEUR(article.price)} x ${articleQuantity} = ${displayInEUR(article.price * articleQuantity)}`
    totalPrice += article.price * articleQuantity
    cloneElt.getElementById("cardID").textContent = article._id
    cloneElt.getElementById("cardNumber").textContent = `x ${articleQuantity}`

    cloneElt.getElementById("seeProduct").addEventListener("click", function(){
        sessionStorage.setItem(`product`, article._id )
        window.location.href = `file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/produit.html?id=${article._id}`;
    })
    cardCount++

    document.getElementById("start").appendChild(cloneElt)

}

function confirmOrder() {
    document.getElementById("orderBtn").addEventListener("click", function(){

        window.location.href = "file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/confirmation.html";
        sessionStorage.clear()
    })
}

function displayInEUR (prix) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix/100);
}

function checkPrice() {
    document.getElementById("totalPrice").textContent = `Votre panier est de ${displayInEUR(totalPrice)} EUR`
}

function procedeToPayment() {
    return fetch("http://localhost:3000/api/teddies" ,{
        method: "POST" ,
        headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
        body: JSON.stringify(commandForm)
    });
}