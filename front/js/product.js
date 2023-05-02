const queryString_url_id = window.location.search;

console.log(queryString_url_id)

const urlSearchParams= new URLSearchParams (queryString_url_id)

const leId = urlSearchParams.get("id")
console.log(leId)

fetch ("http://localhost:3000/api/products/"+ leId) //récupérez les données dans l'API à partir de l'ID du canapé
     .then(function(result){
         return (result.json()) // ensuite on retourne le résultat dans un fichier .json
     })
     .then(function(result){
        
        let canape = result
        console.log(canape)  
        let img = document.createElement("img"); // on crée la variable img

        document.querySelector("div.item__img").appendChild(img) // on ajoute l'image à la fin de la division item__img
        img.src=canape.imageUrl; //on va chercher imageUrl dans l'API
        img.alt=canape.altTxt; //on va chercher altTxt dans l'API
        
        let title = document.getElementById("title") // on appelle le id "title"
        title.textContent = canape.name; // on ajoute le titre à partir de l'API
        
        
        let price = document.getElementById("price") // on appelle le id "price"
        price.textContent = canape.price //on ajoute le prix à partir de l'API
        
        
        let description = document.getElementById("description") // on appelle le id "description"
        description.textContent = canape.description //on ajoute la description à partir de l'API
        
       
        for (let i in canape.colors){

            console.log (canape.colors[i])
            let firstoption = document.createElement("option") // on crée une premiere option
            document.querySelector("#colors").appendChild(firstoption) // on appelle le id color et on ajoute l' option
            firstoption.setAttribute("value",canape.colors[i]) //on ajoute un attribut
            firstoption.textContent = (canape.colors[i])
        }

//******************"ECOUTE"  DE LA QUANTITE pour vérifier s'il est compris entre 1 et 100 */

            quantity.addEventListener("change",function(){ 
                validQuantity(this)
            });

            const validQuantity = function(inputQuantity){
                let quantityRegExp = new RegExp("^[1-9][0-9]?$|^100$","g");
                console.log(quantityRegExp)
                console.log(inputQuantity)
        
            
        
                    if (quantityRegExp.test(inputQuantity.value)){
                        inputQuantity.style.color = "green";
                    
                    }else{
                        inputQuantity.style.color = "red";
                        alert("La quantité est invalide")
                         
                    }
        
                } //fin de la function inputQuantity 
 
//***********************************"ENVOI DANS LE PANIER (qui sera stocké dans le local storage) */            

            addToCart.addEventListener("click",function(e){
                e.preventDefault();


                let canapeChoisi = {name : canape.name, id : leId, color : colors.value, quantity : quantity.value}
                if(quantity.value == 0 || quantity.value >= 101 || colors.value === "" ){
                    
                    alert("Veuillez saisir les informations demandées")
                    
                }else{
                    alert("Vos articles ont bien été ajouté au panier")
                    let  panierFinal = JSON.parse(localStorage.getItem("panier")); 
                    
                    if(panierFinal) {
                        let canapeTrouve = false;
                        for( let i = 0; i < panierFinal.length; i++) {
                        
                            if(canapeChoisi.color==panierFinal[i].color && canapeChoisi.id==panierFinal[i].id){
                                canapeTrouve = true

                                
                                let quantiteFinale = parseInt(panierFinal[i].quantity) + parseInt(canapeChoisi.quantity)
                                
                                if(quantiteFinale >= 101){
                                    alert("Le nombre total de canapés est supérieur à 100")
                                    
                                }else{
                                panierFinal[i].quantity = quantiteFinale
                                
                                }
                            }    
                        };

                        if(canapeTrouve == false){
                            panierFinal.push(canapeChoisi);}

                        localStorage.setItem("panier",JSON.stringify(panierFinal));
                    
                    }else{
                        panierFinal = [] ;
                        panierFinal.push(canapeChoisi);
                        localStorage.setItem("panier",JSON.stringify(panierFinal));
                        
                    }
                
                }
            
        })//fin de l'écoute de l'événement au clic    
     }) //fin du deuxième "then"

     .catch(function(erreur){
        prompt ("Une erreur est survenue")
     })