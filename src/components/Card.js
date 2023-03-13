import React from 'react';


const Card = ({name, id, onItemClick}) => {
    const capitilize = name.charAt(0).toUpperCase() + name.slice(1);
    let url = "";
    if(id<650){
         url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    } else {
         url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }
    return (
        <div id={id} className='tc bg-light-yellow dib br3 pa3 ma3 grow bw2 shadow-5'
            onClick={onItemClick}>
            <img className="h5 w5" alt="pokemon" src={`${url}`} />
            <h2>{capitilize}</h2>
        </div>
    );
    
}


export default Card;
