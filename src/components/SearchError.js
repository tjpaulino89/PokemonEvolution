import React from 'react';

const SearchError = ({goToList}) => {
    return (
        <div>
            <h1>Cannot find Pokemon, please try again.</h1>
            <button className="dib br3 pa3 ma3 bw2 shadow-5" onClick={goToList}>Go Back</button>
        </div>
    )
}

export default SearchError;