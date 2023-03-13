import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import EvolutionArrow from '../components/EvolutionArrow';

const EvolutionChain = ({pokemonList, onItemClick, goToList}) => {

    const [pokemonData, setData] = useState([])

    const apiGet = async (pokemon) => {
        try{
            const resEvolution = await fetch(pokemon[0].evolution_chain.url);
            const dataEvolution = await resEvolution.json();
            let pokemonEvoChain = []; 
            
            function chainDepth(evolution) {
                const evolutionPokemon = {};

                evolutionPokemon.name = evolution.species.name;
                const url = evolution.species.url
                const pokemonId = url.slice(42, -1)
                evolutionPokemon.id = parseInt(pokemonId)
                pokemonEvoChain.push(evolutionPokemon)
                
                const nextChain = evolution.evolves_to;
                if (nextChain.length > 0) {
                    chainDepth(nextChain[0]);
                }
            }
            chainDepth(dataEvolution.chain);
            setData(pokemonEvoChain);

        } catch(err) {
            console.log("Error. Please try again.", err)
        }
    };

    useEffect(() => {
        apiGet(pokemonList);
    }, [pokemonList])

    return (
        pokemonData.length === 0 ? <h1>LOADING...</h1> :
        <>        
            <div className='flex flex-wrap justify-center'>
                {
                    pokemonData.map((pokemon, i) => {
                        if(i < pokemonData.length-1){
                            return(
                                <div className='flex flex-wrap justify-center items-center' key={pokemon.id}>
                                    <Card name={pokemon.name} id={pokemon.id} onItemClick={onItemClick}/>
                                    <EvolutionArrow />
                                </div>

                            );
                        } else {
                            return(
                                <Card key={pokemon.id} name={pokemon.name} id={pokemon.id} onItemClick={onItemClick}/>
                            );
                        }
                    })
                }
            </div>
            <button className="dib br3 pa3 ma3 bw2 shadow-5" onClick={goToList}>Go To Pokemon</button>
        </>

    );
};

export default EvolutionChain;