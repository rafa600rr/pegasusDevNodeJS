window.onload = function(){
    document.getElementById("search").addEventListener("click", () => {


        const buscarJson = (url) => {

            const promessaDados = (reject) => {
                
                fetch(url)
        
                    .then((jsonBody) => {
                        if(!jsonBody.ok) throw new Error("Erro ao adquirir requisição, status " +jsonBody.status);
                        return jsonBody.json();
                    })
        
                    .then((jsonBody) => {

                        let tableLister = document.getElementById("tableLister");

                        tableLister.innerHTML = "";
                        
                        for(let i = 0; i < jsonBody.length; i++){
                            
                            const line = tableLister.insertRow(-1);

                            const collunId = linha.incertCell(0);
                            const collunName = line.incertCell(1);

                            collunId.innerHTML = jsonBody[i].id;
                            collunName.innerHTML = jsonBody[i].name;

                        }
        
                        // document.getElementById("name").innerHTML = "Nome: " +jsonBody.name;
                        // document.getElementById("heigth").innerHTML = "Altura: " +jsonBody.height
                        // document.getElementById("hairColor").innerHTML = "Cor do cabelo: " +jsonBody.hair_color;
                        // document.getElementById("skinColor").innerHTML = "Cor da pele: " +jsonBody.skin_color;
                        // document.getElementById("eyeColor").innerHTML = "Cor dos olhos: " +jsonBody.eye_color;
                        // document.getElementById("birthYear").innerHTML = "Ano de nascimento: " +jsonBody.birth_year;
                        // document.getElementById("gender").innerHTML = "Gênero: " +jsonBody.gender;
                        // document.getElementById("homeWorld").innerHTML = "Planeta natal: " +jsonBody.homeworld;
                        // document.getElementById("films").innerHTML = "Filmes: " +jsonBody.films[0]+ ", " +jsonBody.films[1]+ "<br>" +jsonBody.films[2]+ ", " +jsonBody.films[3];
                        // //document.getElementById("species").innerHTML = "Espécies: " +jsonBody.species;
                        // document.getElementById("vehicles").innerHTML = "Veículos: " +jsonBody.vehicles;
                        // document.getElementById("starships").innerHTML = "Naves estelares: " +jsonBody.starships;
        
                    })
        
                    .catch(reject);
        
                    }
        
            return new Promise(promessaDados);
        }
        
        buscarJson("https://swapi.dev/api/people/").catch(console.error);

})
}