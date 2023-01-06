fetch ("http://localhost:3000/api/products") //récupérez les données dans l'API
    .then(function(result){
        return (result.json()) // ensuite on retourne le résultat dans un fichier .json
    })
    .then(function(result){
        console.log(result) // on affiche les résultats dans la console
        result.forEach(canape => { // pour chaque canape, on a le résultat
            console.log(canape) // on affiche dans la console
            let lien = document.createElement("a") // on crée la variable lien
            lien.href="./product.html?id="+canape._id // on fait le lien entre le fichier HTML et JS et on récupére l'ID de chaque canapé
            let items = document.getElementById("items") // on appelle la variable items
            console.log(items)
            items.appendChild (lien)  // on ajoute lien dans les enfants de "items"
            let article = document.createElement("article") // on crée la variable article
            lien.appendChild (article) // on ajoute article dans les enfants de "lien"
            let img = document.createElement("img") // on crée la variable image
            img.src=canape.imageUrl //on va chercher imageUrl dans l'API
            article.appendChild (img)  //on ajoute image dans les enfants de "article"
            img.alt=canape.altTxt //on va chercher altTxt dans l'API
            let title = document.createElement("h3") // on crée le titre h3
            title.classList.add("productName") //on ajoute la classe "ProductName" au h3
            title.textContent = canape.name // on ajoute le texte contenu dans le h3 (API)
            article.appendChild (title) //on ajoute le titre dans les enfants de "article"
            let paragraphe = document.createElement("p")  // on crée le paragraphe
            paragraphe.classList.add("productDescription") //on ajoute la classe "ProductDescription" au paragraphe
            paragraphe.textContent = canape.description //on ajoute le texte contenu dans le paragrphe (API)
            article.appendChild (paragraphe) //on ajoute le paragraphe dans les enfants de "article"
        });
    })
    .catch(function(erreur){
        prompt ("Une erreur est survenue")
    })



