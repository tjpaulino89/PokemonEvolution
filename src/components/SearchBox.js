import React from 'react';

const SearchBox = ({ onSearch }) => {
    return (
        <div className='search dib'>
            <input id="searchbox" className='br3 pa3 ma1 ba bw2 b--pokemon-blue bg-lightest-blue' onKeyDown={onSearch} type="search" placeholder="search pokemon" />
            <button id="searchbtn" className='br3 pa3 ma1 ba bw2 b--pokemon-blue bg-pokemon-light-grey' onClick={onSearch} type="button">Search</button>
        </div>
    )
}

export default SearchBox;