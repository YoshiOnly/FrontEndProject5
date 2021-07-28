// fichier js du panier

//prix total de la commande
let totalPrice = 0;

class currencyDisplay {
    static currencyInEUR(value) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value/100);
    }
}

// modéle du contact
let contact =  {
    firstName: "" ,
    lastName: "" ,
    address: "",
    city: "",
    email: ""
}

// Array d'id des articles commandés
let products = [];

// formulaire pour l'API avant JSON
let commandForm = { contact, products};

//vérification regex
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

main()

/** Fonction main */
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

/** Comparaison des données du paniers aux données du serveur */
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
        alert("Le serveur ne répond pas")
    })
}

/** Affichage des données 
 * @param {var} article - article du serveur.
 * @param {float} articleQuantity - Quantité d'artices comamndés.
*/
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
        window.location.href = `./produit.html?id=${article._id}`;
    })
    cloneElt.getElementById("removeProduct").addEventListener("click", function(){
        removeArticle(article);
    })

    //ajout du clone sur le html
    document.getElementById("start").appendChild(cloneElt)
    console.log("clone iteration")

}

/** Confirmation des données */
function confirmOrder() {
    //Sur submit :
    document.getElementById("orderBtn").addEventListener("click",async function(event){
        event.preventDefault();
        // check form, if it's ok
        checkForm()
        if (regexMail.test(contact.email) == true) {
            if (regexName.test(contact.firstName) == true) {
                if (regexName.test(contact.lastName) == true) {
                    if (regexCity.test(contact.city) == true) {
                        if (regexAddress.test(contact.address) == true) {
                            console.log(contact)
                            console.log(products)
                            // send info to server
                            commandForm = { contact, products};

                            let promise = await procedeToPayment(commandForm)
                            // send info to localStorage
                            console.log(promise)
                            // go to confirm page
                        }
                        else {
                            alert("L'adresse n'est pas correct")
                        }
                    }
                    else {
                        alert("La ville n'est pas correct")
                    }
                }
                else {
                    alert("Le nom de famille n'est pas correct")
                }
            }
            else {
                alert("Le prenom n'est pas correct")
            }
        }
        else {
            alert("L'e-mail n'est pas correct")
        }         
    })
}


/** Confirmation du prix */
function checkPrice() {
    if(totalPrice > 0) {
        document.getElementById("totalPrice").textContent = `Votre panier est de ${currencyDisplay.currencyInEUR(totalPrice)} EUR`
    }
    else {
        document.getElementById("totalPrice").textContent = `Votre panier est vide`
    }
    
    console.log("check price")
}

/** Récupération des données du serveur aprés envoie du formulaire 
 * @param {var} commandForm - formulaire pour l'api avant tranformation en JSON.
*/
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
        window.location.href = "./confirmation.html";
        return articles
    })
    .catch(function(error)
    {
        alert(error)
        alert("Le serveur ne répond pas")
    });
}

/** Récupération des données du formulaire */
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

function removeArticle(article) {
    for (i = 0; i < sessionStorage.length ; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key)
        if( article._id == value){
            let articleQuantity = sessionStorage.getItem(`${key}-quantity`)
            articleQuantity -= 1;
            sessionStorage.setItem(`${key}-quantity` , articleQuantity)
            if(articleQuantity == 0) {
                sessionStorage.removeItem(`${key}-quantity`)
                sessionStorage.removeItem(key)
            }
            window.location.href = `./panier.html`;
            console.log("article removed")
        }
        else {
            console.log("fail to remove article")
        }
    }
}