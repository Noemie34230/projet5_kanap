
const queryString_url_orderId = window.location.search; // on cherche dans url le numéro de l'orderID
console.log(window.location)
console.log(queryString_url_orderId)

const urlSearchParams= new URLSearchParams (queryString_url_orderId)

const leOrderId = urlSearchParams.get("orderId") //on obtient le orderID
console.log(leOrderId)


let orderId = document.getElementById("orderId");  
console.log(orderId)

orderId.textContent = leOrderId; // on insère le orderID dans le DOM

if(leOrderId != null){ // Si la commande est bien passée, on efface le panier dans le local storage
    localStorage.clear()
}else{
    alert("Veuillez nous excuser votre commande n'est pas passée")
}