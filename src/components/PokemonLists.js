import React from 'react';
import CardList from './CardList';
import EvolutionChain from '../containers/EvolutionChain';
import NavButtons from './NavButtons';

const PokemonLists = (props) => {
    if (props.displayEvolution) {
        return <EvolutionChain pokemonList={props.pokemonList} onItemClick={props.onItemClick} goToList={props.goToList}/>
    }
    return (
        <>
            <CardList pokemonList={props.pokemonList} onItemClick={props.onItemClick}/>
            <NavButtons 
                goToNextPage={props.goToNextPage}
                goToPrevPage={props.goToPrevPage}/>
        </>
    )
}

export default PokemonLists;