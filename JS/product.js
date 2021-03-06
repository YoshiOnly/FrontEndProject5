// Fichier js de la page produit

// Récupération des parametre de l'url
articleParameter = new URLSearchParams(window.location.search)

// emplacement de stockage des variables du formulaire
let selectedColor = null
let numberOfProducts = null

main()

/** Fonction main */
async function main() {
    const articles = await getArticles()
    console.log(articles)

    for (article of articles)
    
    checkProduct(article)

    console.log(window.location.search)
}

/** Récupération des URLsearchparameters 
 * @param {var} article - article du serveur.
*/
function checkProduct(article){
    if(window.location.search != null)
    {
        var key = articleParameter.get('id')
        if(article._id == key){
            displayArticle(article)
        }
    }
    else{
        console.log("no id")
        alert("Error 404")
    }
}

/** Récupération des données du serveur en fonction des paramétres */
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


        

/** Affichage de la carte produit 
 * @param {var} article - article du serveur.
*/
function displayArticle(article) {

    const templateElt = document.getElementById("templateArticle")

    const cloneElt = document.importNode(templateElt.content, true)


    cloneElt.getElementById("cardName").textContent = article.name
    cloneElt.getElementById("cardImage").src = article.imageUrl
    cloneElt.getElementById("cardDescription").textContent = article.description
    cloneElt.getElementById("cardPrice").textContent = displayInEUR(article.price)
    cloneElt.getElementById("cardID").textContent = article._id


    colorSelector = cloneElt.getElementById("cardColor")
    for(color of article.colors){
        let colorOption = document.createElement('option');
        colorOption.appendChild( document.createTextNode(`${color}`));
        colorOption.value = `${color}`;
        colorSelector.appendChild(colorOption);
    }


    cloneElt.getElementById("cardColor").addEventListener("change", function(){
        selectedColor =  document.getElementById("cardColor").value;
    })

    cloneElt.getElementById("numberOfProducts").addEventListener("change", function(){
        numberOfProducts =  document.getElementById("numberOfProducts").value;
    })

    cloneElt.getElementById("addToCartBtn").addEventListener("click", function(){
        if (sessionStorage.getItem(`order ${article.name}`) == null){
            if(selectedColor != null) {
                if(numberOfProducts != null) {
                    sessionStorage.setItem(`order ${article.name}`, article._id )
                    sessionStorage.setItem(`order ${article.name}-color`, selectedColor )
                    sessionStorage.setItem(`order ${article.name}-quantity`, numberOfProducts )
                    this.classList.add("disabled");
                    alert("L'objet a été ajouté à votre panier")
                }
                else {
                    alert("Veuillez choisir la quantité voulue")
                }
            }
            else {
                alert("Veuillez choisir une couleur")
            }
        }
        else {
            alert("L'objet est déjà dans votre panier");
        }
    })

    document.getElementById("start").appendChild(cloneElt)

}

function displayInEUR (prix) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix/100);
}