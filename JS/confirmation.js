class currencyDisplay {
    static currencyInEUR(value) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value/100);
    }
}

const order = JSON.parse(localStorage.getItem("order")) || [];
const orderInfo = localStorage.getItem("orderInfo");

main() 

function main() {
    if(localStorage.getItem("order") != null){
        document.getElementById("confirmationText1").textContent = ` Merci pour votre achat sur notre site ${order.contact.firstName} ${order.contact.lastName} !`
        document.getElementById("confirmationText2").textContent = ` Votre total est de ${currencyDisplay.currencyInEUR(orderInfo)}.`
        document.getElementById("confirmationText3").textContent = ` Votre commande a pour identifiant ${order.orderId}.`
    }
}