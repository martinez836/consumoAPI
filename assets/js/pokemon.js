const id = document.querySelector("#pokemonName");
const boton = document.querySelector("#fetchPokemon");
const nameElement = document.querySelector("#name");
const habilidadesElement = document.querySelector("#abilities");
const colorElement = document.querySelector("#color");
const habitatElement = document.querySelector("#habitat");
const imagenElement = document.querySelector("#pokemonImage");

boton.addEventListener("click", () => {
    const pokemonName = id.value.trim().toLowerCase(); 
    if (!pokemonName) {
        alert("Por favor, ingrese un nombre de Pokémon.");
        return;
    }
    
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;

    fetch(urlPokemon)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon no encontrado");
            return response.json();
        })
        .then(data => {
            nameElement.textContent = data.name;
            const abilities = data.abilities.map(ability => ability.ability.name).join(", ");
            habilidadesElement.textContent = abilities;
            imagenElement.src = data.sprites.front_default;
            imagenElement.alt = `Imagen de ${data.name}`;
            
            return fetch(urlSpecies);
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener datos de especie");
            return response.json();
        })
        .then(speciesData => {
            colorElement.textContent = speciesData.color.name;
            habitatElement.textContent = speciesData.habitat ? speciesData.habitat.name : "Desconocido"; 
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
});
