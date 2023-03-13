import React, { Component } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import PokemonLists from '../components/PokemonLists';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchError from '../components/SearchError';

class App extends Component {
  constructor() {
      super()
      this.state = {
          pokemonDisplayed: [],
          displayEvolution: false,
          loading: true,
          nextPage: null,
          prevPage: null,
          currentPage: 'https://pokeapi.co/api/v2/pokemon/',
          searchError: false,
          searching: false
      }
  }

  //Fetch first 20 pokemon to display
  componentDidMount() {
    this.fetchPokemonPage();
  }

  //Fetch 20 pokemon on state change
  componentDidUpdate(prevprops, prevstate) {
    if (this.state.currentPage !== prevstate.currentPage) {
      this.fetchPokemonPage();
    }
  };

  //Fetch pokemon to display
  fetchPokemonPage = () => {
    this.setState({ loading: true })
    fetch(this.state.currentPage)
        .then(response => response.json())
        .then(data => {
          this.setState({ loading: false, nextPage: data.next, prevPage: data.previous })
          const pokemonNames = data.results.map(item => item.name);
          const pokemonPromises = pokemonNames.map(item => {
            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${item}/`).then(resp => resp.json())
            })
          Promise.all(pokemonPromises)
            .then(responses => {
              this.setState({ pokemonDisplayed: responses});})
            .catch(err => console.log("Error. Please try again.", err))
          })
          .catch(err => console.log("Error. Please try again.", err))
  }

  //Identify clicked pokemon to update pokemon displayed
  onItemClick = (event) => {
      if (!this.state.displayEvolution && event.currentTarget.id){
          const clickId = parseInt(event.currentTarget.id)
          const pokemonClicked = this.state.pokemonDisplayed.filter(item => item.id === clickId);
          this.setState({ pokemonDisplayed: pokemonClicked, displayEvolution: true });
      }
  }

  //Fetch pokemon data entered into searchbox to update pokemon displayed
  onSearch = (event) => {
      if(event.keyCode === 13 || event.type === "click"){
          this.setState({ searching: true })
          const enteredName = document.querySelector("#searchbox").value.toLowerCase().trim()
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${enteredName}/`)
              .then(response => response.json())
              .then(data => {
                  this.setState({ searching: false, searchError: false, pokemonDisplayed: [data], displayEvolution: true});
              }).catch(err => {
                  this.setState({ searchError: true })
                  console.log("Error. Please try again.", err)
              })
      }
  }

  goToNextPage = () => {
    if(this.state.nextPage){
     this.setState({  pokemonDisplayed: [], currentPage: this.state.nextPage })
    }
  }

  goToPrevPage = () => {
    if(this.state.prevPage){
      this.setState({ currentPage: this.state.prevPage })
    }
  }

  goToList = () => {
    this.setState({ displayEvolution: false, searchError: false, searching: false});
    this.fetchPokemonPage();
  }

  //Render
  render() {
    if (this.state.loading){
      return <h1>LOADING...</h1>
    }
    return(
      <div className='tc'>
        <h1 className='f-subheadline lh-title'>Pokemon Evolution</h1>
          <SearchBox onSearch={this.onSearch}/>
            {this.state.searchError ? <SearchError goToList={this.goToList}/> :
            this.state.searching ? <h1>Searching...</h1> :
            <ErrorBoundary>
                <PokemonLists 
                  displayEvolution={this.state.displayEvolution}
                  pokemonList={this.state.pokemonDisplayed}
                  onItemClick={this.onItemClick}
                  goToNextPage={this.state.nextPage ? this.goToNextPage : null}
                  goToPrevPage={this.state.prevPage ? this.goToPrevPage : null}
                  goToList={this.goToList}/>
            </ErrorBoundary>}
      </div>
    );
  }
}

export default App;
