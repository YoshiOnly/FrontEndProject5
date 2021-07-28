// Fichier js des boutons de navigation
const boutonRetour = document.getElementById("returnBtn")
const boutonListe = document.getElementById("listBtn")

main()

/** Fonction simple de redirection des boutons */
function main(){

    if (boutonRetour != null){
    boutonRetour.addEventListener("click", function(){
        window.location.href = "./liste.html";
    })}

 

    if ( boutonListe != null ) {
    boutonListe.addEventListener("click", function(){
        window.location.href = "./Pages/liste.html";
    })}

   
}
