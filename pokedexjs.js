const card = document.querySelector('[data-card]');
const nname = document.querySelector('[data-name]');
const img = document.querySelector('[data-img]');
const ImgContainer = document.querySelector('[data-img-container]');
const Id = document.querySelector('[data-Id]');
const ptypes = document.querySelector('[data-types]');
const pstats = document.querySelector('[data-stats]');
const pabilities = document.querySelector('[data-ability]');


const typeColors = {
    electric: '#FFFD70',
    normal: '#b09398',
    fire: '#ff675c',
    water: '#0596c6',
    ice: '#afeafd',
    rock: '#999799',
    flying:'#7ae7c7',
    grass: '#4a9681',
    psychic: '#ffc6d9',
    ghost: '#561d25',
    bug: '#a2faa3',
    poison: '#795663',
    ground: '#d2b074',
    dragon: '#da627d',
    steel: '#1d8a99',
    fighting:'#2f2f2f',
    default: '#2a1a1f',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokeName;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())      
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types, abilities} = data;

    console.log(data);

    nname.textContent = data.name;
    img.setAttribute('src',sprite);
    Id.textContent = `# ${data.id.toString().padStart(3, 0)}`;
    setCardColor(types);//Estilos para colores de fondo]
    renderPokemonTypes(types);//Estilo para colores de letras
    renderPokemonStats(stats);//Pone datos del poquemon
    renderPokemonAbilities(abilities);//habilidades del pokemon
    
    
}

// da el color a letras y fondo de pantalla
const setCardColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colortwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    img.style.background = `radial-gradient(${colortwo} 33%, ${colorOne} 33%)`; 
    img.style.backgroundSize = '5px 5px';

}

const renderPokemonTypes = types => {
    ptypes.innerHTML = 'Type: ';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name]
        typeTextElement.textContent = type.type.name;
        ptypes.appendChild(typeTextElement)
    });
}
 
const renderPokemonStats = stats => {
    pstats.innerHTML = 'Point: ';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pstats.appendChild(statElement);
    });
}

const renderPokemonAbilities = abilities => {
    pabilities.innerHTML = 'Abilities: ';
    abilities.forEach(ability => {
        const abilityElement = document.createElement("div");
        const abilityElementName = document.createElement("div");
        abilityElementName.textContent = ability.ability.name;
        abilityElement.appendChild(abilityElementName);
        pabilities.appendChild(abilityElement);
    });

}

const renderNotFound = () => {
    nname.textContent = "No encontrado";
    Id.textContent = '-----N/A-----';
    pokeImg.setAttribute('src','No_pokemon.png');
    pokeImg.style.background = '#ff3234';
    ptypes.innerHTML = '-----N/A-----';
    pstats.innerHTML = '-----N/A-----';
    pId.textContent = '-----N/A-----';
    pabilities.innerHTML = '-----N/A-----';
    abilityElementName.textContent ='-----N/A-----';


}