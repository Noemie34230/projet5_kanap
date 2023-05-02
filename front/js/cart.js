// ********************************* VARIABLES GLOBALES *********************

let  panierFinal = JSON.parse(localStorage.getItem("panier"));
  
let total = 0; 
let sum = 0;

let products = [];//constitution d'un tableau vide pour y ajouter les id des produits 

let messageErreurPrenom = document.getElementById("firstNameErrorMsg")
let messageErreurNom = document.getElementById("lastNameErrorMsg")
let messageErreurAddress = document.getElementById("addressErrorMsg") 
let messageErreurCity = document.getElementById("cityErrorMsg")
let messageErreurEmail = document.getElementById("emailErrorMsg") 

// ********************************* FIN des variables globales *********************

if (panierFinal  !== null && panierFinal.length  !== 0) {

    for( let i = 0; i < panierFinal.length; i++) {
        let idCanape = panierFinal[i].id
        //console.log(idCanape)
    
fetch ("http://localhost:3000/api/products/"+idCanape) //récupérez les données dans l'API
     .then(function(result){
         return (result.json()) // ensuite on retourne le résultat dans un fichier .json
     })
     .then(function(result){
       
        // console.log(result)
        let canapes = result

                
//************************* CREATION DE L'ARTICLE************************* */ 

                let article = document.createElement("article")
                document.querySelector("section#cart__items").appendChild(article)
                article.classList.add("cart__item")
                article.setAttribute("data-id", panierFinal[i].id)
                article.setAttribute("data-color", panierFinal[i].color)

//************************* CREATION DE LA DIV IMAGE  ************************* */ 
                let divImg = document.createElement("div")
                article.appendChild(divImg)
                divImg.classList.add("cart__item__img")
                let img = document.createElement("img")
                divImg.appendChild(img)


//************************* CREATION DE LA DIV CONTENT  ************************* */                 
                let divContent = document.createElement("div")
                article.appendChild(divContent)
                divContent.classList.add("cart__item__content")

//************************* DESCRIPTION  ************************* */ 
                let divContentDescription = document.createElement("div")
                divContent.appendChild(divContentDescription)
                divContentDescription.classList.add("cart__item__content__description")

//************************* TITRE  ************************* */ 

                let title = document.createElement("h2")
                divContentDescription.append(title)
                title.textContent = panierFinal[i].name

//************************* COULEUR  ************************* */ 

                let paragrapheColor = document.createElement("p")
                divContentDescription.append(paragrapheColor)
                paragrapheColor.textContent = panierFinal[i].color

//************************* PRIX  ************************* */                 

                let paragraphePrice = document.createElement("p")
                divContentDescription.appendChild(paragraphePrice)

//**************** RECUPERATION DES DONNEES DANS L'API  ************************* */ 

                img.src=canapes.imageUrl; // L'IMAGE DU BON CANAPE PARMI TOUS LES CANAPES
                img.alt=canapes.altTxt;  // LE TEXTE ALTERNATIF DU BON CANAPE PARMI TOUS LES CANAPES
                paragraphePrice.textContent = canapes.price + "€" // LE PRIX DU BON CANAPE PARMI TOUS LES CANAPES


//************************* SETTING  ************************* */ 

                let divContentSetting = document.createElement("div")
                divContent.appendChild(divContentSetting)
                divContentSetting.classList.add("cart__item__content__settings")

                let divContentSettingQuantity = document.createElement("div")
                divContentSetting.appendChild(divContentSettingQuantity)
                divContentSettingQuantity.classList.add("cart__item__content__settings__quantity")


                let paragrapheQuantity = document.createElement("p")
                divContentSettingQuantity.appendChild(paragrapheQuantity)
                paragrapheQuantity.textContent = "Qté : "

//************************* INPUT  ************************* */                     
                let input = document.createElement("input")
                divContentSetting.appendChild(input)
                input.setAttribute("type", "number")

                input.classList.add("itemQuantity")
                input.setAttribute("name","itemQuantity")
                input.setAttribute("min","1")
                input.setAttribute("max","100")
                input.setAttribute("value",panierFinal[i].quantity)

//**************************CHANGEMENT DE QUANTITE *********************

                let quantityActuelle = document.querySelectorAll(".itemQuantity")

                for (let r = 0; r < quantityActuelle.length; r++){

                    
                    quantityActuelle[r].addEventListener("change", newQuantity,false);     
                    function newQuantity(e){
                        
                        e.stopImmediatePropagation()    
                        
                        panierFinal[i].quantity = quantityActuelle[r].value;

                        if(quantityActuelle[r].value == 0 || quantityActuelle[r].value >= 101 ){
                            quantityActuelle[r].style.color = "red";
                            alert("Veuillez saisir une quantité comprise entre 1 et 100")
                            
                        }else{
                            quantityActuelle[r].style.color = "green";
                            // console.log(panierFinal[i].quantity)
                            localStorage.setItem("panier", JSON.stringify(panierFinal))
                            window.location.href = "cart.html"
                        }
                    }
                }

// ********************* SUPPRIMER UN ARTICLE *********************
                
                let articleDomId = article.dataset["id"];
                let articleDomColor = article.dataset["color"];

                let divContentSettingQuantityDelete = document.createElement("div")
                divContentSetting.appendChild(divContentSettingQuantityDelete)
                divContentSettingQuantityDelete.classList.add("cart__item__content__settings__delete")

                let paragraphedeleteItem = document.createElement("p")
                divContentSettingQuantityDelete.appendChild(paragraphedeleteItem)
                paragraphedeleteItem.classList.add("deleteItem")
                paragraphedeleteItem.textContent = "Supprimer"

                let deleteItem = document.querySelectorAll(".deleteItem");

                for (let k = 0; k < deleteItem.length; k++){
                    
                    deleteItem[k].addEventListener("click",(event) => {
                    
                        event.stopImmediatePropagation() //pour éviter la boucle 

                            panierFinal = panierFinal.filter ( function (e){
                                // console.log(e)
                                
                                if (e.id !== articleDomId || e.color !== articleDomColor) {
                                    return true
                                    }
                            }) // fin de la fonction filtre sur le panier final
                            // console.log(panierFinal)
                            
                            localStorage.setItem("panier", JSON.stringify(panierFinal))

                            window.location.href = "cart.html" // pour recharger la page HTML
                    });

                }


            
// ********************************* TOTAL DES ARTICLES *********************
        
            
            
            sum += parseInt(panierFinal[i].quantity)
                
            // console.log(sum) 
           


            let totalQuantity = document.getElementById("totalQuantity")
            totalQuantity.textContent = sum

// ********************************* MONTANT TOTAL *********************

            let totalParcanapes = canapes.price * parseInt(panierFinal[i].quantity)
            console.log(totalParcanapes)
            
            total = total + totalParcanapes
            
            console.log(total)

            let totalPrice = document.getElementById("totalPrice")
            totalPrice.textContent = total

// ********************************* FORMULAIRE *********************


// ********************************* FIRSTNAME *********************

            firstName.addEventListener("input",function(){ 
                validPrenom(this)
            });

            const validPrenom = function(e){
                let prenomRegExp = new RegExp("^[A-Za-z\à\ä\â\é\è\ê\ë\ï\î\-]+$","g");
        
        
                    if (prenomRegExp.test(e.value)){
                        e.style.color = "green";
                        let messageValidPrenom =  document.getElementById("firstNameErrorMsg")
                        messageValidPrenom.textContent = " ";
                    
                    
                    }else{
                        e.style.color = "red";
                        messageErreurPrenom.textContent = "La saisie est incorrecte"
                        
                        
                    }
                    
            } //fin de la function firstName

// ********************************* LASTNAME *********************
            lastName.addEventListener("input",function(){ 
                validNom(this)
            });

            const validNom = function(e){
                let nomRegExp = new RegExp("^[A-Za-z\à\ä\â\é\è\ê\ë\ï\î\-]+$","g");
        
        
                    if (nomRegExp.test(e.value)){
                        e.style.color = "green";
                        let messageValidNom =  document.getElementById("lastNameErrorMsg")
                        messageValidNom.textContent = " "
                    
                    }else{
                        e.style.color = "red";
                        
                        messageErreurNom.textContent = "La saisie est incorrecte"

                    }
        
            } //fin de la function lastName

// ********************************* ADDRESS *********************
            address.addEventListener("input",function(){ 
                validAddress(this)
            });

            const validAddress = function(e){
                let addresseRegExp = new RegExp("^[A-Za-z0-9\é\è\ê\-\\s]+$","g");
                                    
                
                    if (addresseRegExp.test(e.value)){
                        e.style.color = "green";
                        let messageValidAddress =  document.getElementById("addressErrorMsg")
                        messageValidAddress.textContent = " "
                    
                    }else{
                        e.style.color = "red";
                         
                        messageErreurAddress.textContent = "La saisie est incorrecte" 
                        
                    }

            } //fin de la function address

// ********************************* CITY *********************
            city.addEventListener("input",function(){ 
                validCity(this)
            });

            const validCity = function(e){
                let cityRegExp = new RegExp("^[A-Za-z\à\ä\â\é\è\ê\ë\ï\î\-\\s]+$","g");


                    if (cityRegExp.test(e.value)){
                        e.style.color = "green";
                        let messageValidCity =  document.getElementById("cityErrorMsg")
                        messageValidCity.textContent = " " 
                     
                    }else{
                        e.style.color = "red";
                        
                        messageErreurCity.textContent = "La saisie est incorrecte" 
                    }

            } //fin de la function city


// ********************************* EMAIL *********************
            email.addEventListener("input",function(){ 
                validEmail(this)
            });

            const validEmail = function(e){
                
                let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$", "g");


                    if (emailRegExp.test(e.value)){
                        e.style.color = "green";
                        let messageValidEmail =  document.getElementById("emailErrorMsg")
                        messageValidEmail.textContent = " "
                    
                    }else{
                        e.style.color = "red";
                        
                        messageErreurEmail.textContent = "La saisie est incorrecte"
                        //alert(messageErreurEmail.textContent)
                        
                    }
                    
            } //fin de la function email
        
        })// fin du deuxième then
    
    }//fin de la boucle for pour parcourir le panier Final i


    // ********************************* ENVOI DU FORMULAIRE *********************            
  
        


        for(let g = 0; g < panierFinal.length; g++) {
            products.push(panierFinal[g].id)
        } // fin de la boucle for pour le panier final g
} // fin de la condition où le panier est différent de vide

        let boutonOrder = document.getElementById("order"); // ecoute du bouton order
        boutonOrder.addEventListener("click",function(e){
            
            e.preventDefault();

        let prenom =  document.getElementById("firstName");
        let nom =  document.getElementById("lastName");
        let adresse =  document.getElementById("address");
        let ville =  document.getElementById("city");
        let mail =  document.getElementById("email");
        
        let contact = { //constitution de l'objet contact pour y mettre les informations saisies dans le formulaire
            firstName :prenom.value,
            lastName : nom.value,
            address : adresse.value,
            city : ville.value,
            email : mail.value,
        };

                
            if (panierFinal  === null || panierFinal.length  === 0) {
                    alert("Votre panier est vide")

                }else if (prenom.value === "" || nom.value === "" || adresse.value === "" || ville.value === "" || mail.value === "") {
                        
                    alert("Un des champs du formulaire est vide")

                }else if ( messageErreurPrenom.textContent === "La saisie est incorrecte"||messageErreurNom.textContent === "La saisie est incorrecte" || messageErreurAddress.textContent === "La saisie est incorrecte" || messageErreurCity.textContent === "La saisie est incorrecte" || messageErreurEmail.textContent === "La saisie est incorrecte" ){
                    
                    alert("Votre formulaire n'est pas bien rempli")
                    
                }else{

                    
                    confirmationCommande({ products, contact }); // Elements à envoyer au serveur (un array avec les id et un objet contact)

                    function confirmationCommande(data) { 
                        fetch("http://localhost:3000/api/products/order", { 
                            method: "POST",
                            headers: {
                                "Accept" : "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data), 
                            // L'API necessite que les informations soient transmises en JSON
                        })
                            .then((response) => {
                                return response.json()
                            })

                            .then((response) => {
                                
                                let orderId = response.orderId

                                    window.location.href = "confirmation.html?orderId="+orderId; // sinon peut se rendre sur la page confirmation, avec l'orderId noté à la fin de l'url

                            })
                            .catch(function(erreur){
                                alert ("Une erreur est survenue")
                            })
                    }//fin de la confirmation de commande 
                }// fin du else

            })//fin de l'écoute du click de la commande
        
