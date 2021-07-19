var cardCount = 1
var KeyNames = [];

var totalPrice = 0;



var contact =  {
    firstName: "" ,
    lastName: "" ,
    address: "",
    city: "",
    email: ""
}

var products = [];

var commandForm = { contact, products};

//vérification regex
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

main()



async function main() {

    //recupération des données
    const articles = await getArticles()
    console.log(articles)

    //Comparaison des données
    for (article of articles) 
    checkArticle(article)
    
    
    //Analyse des données
    checkPrice()

    //Vérification des données
    confirmOrder()
    console.log("main iteration")
    //test
}

//Comparaison des données du paniers aux données serveurs
function checkArticle(article) {
    for (i = 0; i < sessionStorage.length ; i++) {
        var key = sessionStorage.key(i)
        var value = sessionStorage.getItem(key)
        if( article._id == value){
            var articleQuantity = sessionStorage.getItem(`${key}-quantity`)
            displayArticle(article, articleQuantity)
            console.log("positive iteration")
        }
        else {
            console.log("fail iteration")
        }
    }
}


// Récupération des données du serveur
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

// Affichage des données
function displayArticle(article, articleQuantity) {

    //clonage du template
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    //modification du clone
    cloneElt.getElementById("cardName").textContent = article.name
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardPrice").textContent = `${currencyDisplay.currencyInEUR(article.price)} x ${articleQuantity} = ${currencyDisplay.currencyInEUR(article.price * articleQuantity)}`
    //(ajustement du prix)
    totalPrice += article.price * articleQuantity
    for(p=0; p < articleQuantity ; p++){
        products.push(`${article._id}`)
    }
    cloneElt.getElementById("seeProduct").addEventListener("click", function(){
        window.location.href = `file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/produit.html?id=${article._id}`;
    })

    //ajout du clone sur le html
    document.getElementById("start").appendChild(cloneElt)
    console.log("clone iteration")

}

//Confirmation des données
function confirmOrder() {
    //Sur submit :
    document.getElementById("orderBtn").addEventListener("click",async function(event){
        event.preventDefault();
        // check form, if it's ok
        checkForm()
        if ((regexMail.test(contact.email) == true) &
        (regexName.test(contact.firstName) == true) &
        (regexName.test(contact.lastName) == true) &
        (regexCity.test(contact.city) == true) &
        (regexAddress.test(contact.address) == true)) {
        console.log(contact)
        console.log(products)
        // send info to server
        commandForm = { contact, products};

        let promise = await procedeToPayment(commandForm)
        // send info to localStorage
        

        console.log(promise)
        // go to confirm page
        // 
        // 

        }
        else [
            window.alert("Le formulaire de contact est n'est pas correct")
        ]
        
        
    })
}


// Confirmation du prix
function checkPrice() {
    document.getElementById("totalPrice").textContent = `Votre panier est de ${currencyDisplay.currencyInEUR(totalPrice)} EUR`
    console.log("check price")
}

//Récupération des données du serveur aprés envoie du formulaire
function procedeToPayment(commandForm) {
    return fetch("http://localhost:3000/api/teddies/order" ,{
        method: "POST" ,
        headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
        body: JSON.stringify(commandForm)
    })
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        localStorage.setItem("order", JSON.stringify(articles));
        localStorage.setItem("orderInfo", totalPrice);
        sessionStorage.clear()
        window.location.href = "file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/confirmation.html";
        return articles
    })
    .catch(function(error)
    {
        alert(error)
    });
}

 function checkForm() {
     contact.firstName = document.getElementById("firstName").value;
     contact.lastName = document.getElementById("lastName").value;
     contact.address = document.getElementById("adress").value;
     contact.city = document.getElementById("city").value;
     contact.email = document.getElementById("email").value;

     if(contact.firstName != null || contact.lastName != null || contact.adress != null || contact.city != null || contact.email != null) {
        console.log("contact is good")
     }
 }