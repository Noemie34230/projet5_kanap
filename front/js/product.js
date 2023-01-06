const queryString_url_id = window.location.search;
console.log(queryString_url_id)

const urlSearchParams= new URLSearchParams (queryString_url_id)

const leId = urlSearchParams.get("id")
console.log(leId)
console.log("hello")
fetch ("http://localhost:3000/api/products/"+ leId) //récupérez les données dans l'API
     .then(function(result){
         return (result.json()) // ensuite on retourne le résultat dans un fichier .json
     })
     .then(function(result){
         //console.log(result) // on affiche les résultats dans la console
       
       let canape = result  
       let img = document.createElement("img"); // on crée la variable img

        document.querySelector("div.item__img").appendChild(img) // on ajoute l'image à la fin de la division item__img
       img.src=canape.imageUrl; //on va chercher imageUrl dans l'API
       img.alt=canape.altTxt; //on va chercher altTxt dans l'API
        
       let title = document.getElementById("title") // on appelle le id "title"
        title.textContent = canape.name; // on ajoute le titre à partir de l'API
        //console.log(""+canape.name)
        
        
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

        addToCart.addEventListener("click",function(e){
        //if(canape.colors.value = true && validQuantity > 1){

        quantity.addEventListener("change",function(){ 
            validQuantity(this)
        });
            const validQuantity = function(inputQuantity){
            let quantityRegExp = new RegExp("^[1-9][0-9]?$|^100$","g");
            console.log(quantityRegExp)
            console.log(inputQuantity)
     
        
       
            if (quantityRegExp.test(inputQuantity.value)){
             inputQuantity.style.color = "green";
             //alert("La quantité est valide") 
             
            }else{
             inputQuantity.style.color = "red";
             alert("La quantité est invalide") 
            }
     
            }    
        
        
       let optionsCanape  = [
            canape.name,
            leId,
            colors.value,
            quantity.value]

         



        //console.log(optionsdeuxCanape)
        let canapeLocalStorage = JSON.stringify(optionsCanape)
            localStorage.setItem("canap",canapeLocalStorage);
            console.log(canapeLocalStorage)

        // if(optionsCanape){
        //     let canapedeuxLocalStorage = JSON.stringify(optionsdeuxCanape)
        //     localStorage.setItem("canapdeux",canapedeuxLocalStorage);
        //     //console.log(canapedeuxLocalStorage)
        
        //  }else{
        //     let canapeLocalStorage = JSON.stringify(optionsCanape)
        //     localStorage.setItem("canap",canapeLocalStorage);
        //     //console.log(canapeLocalStorage)
        //  }

        
    

    
          
console.log("hello") 

        })    
    })