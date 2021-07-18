const boutonRetour = document.getElementById("returnBtn")
const boutonListe = document.getElementById("listBtn")

main()

function main(){

    if (boutonRetour != null){
    boutonRetour.addEventListener("click", function(){
        window.location.href = "file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/index.html";
    })}

 

    if ( boutonListe != null ) {
    boutonListe.addEventListener("click", function(){
        window.location.href = "file:///C:/Users/jonat/OneDrive/Bureau/Projet%205/Front-end/Pages/liste.html";
    })}

   
}
