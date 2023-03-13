import React from 'react';
import Card from './Card';

const CardList = ({pokemonList, onItemClick}) => {

    return (
        <div>
            {
                pokemonList.map(pokemon => {
                    return(
                        <Card key={pokemon.id} name={pokemon.name} id={pokemon.id} onItemClick={onItemClick}/>
                    );
                })
            }
        </div>
    );
}

export default CardList;