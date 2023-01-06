fetch ("http://localhost:3000/api/products") //récupérez les données dans l'API
    .then(function(result){
        return (result.json()) // ensuite on retourne le résultat dans un fichier .json
    })
    .then(function(result){
        console.log(result) // on affiche les résultats dans la console
        result.forEach(canape => { // pour chaque canape, on a le résultat
            console.log(canape) // on affiche dans la console

            

        });
    })