import React from "react";

const NavButtons = ({ goToPrevPage, goToNextPage }) => {
    return (
        <div>
            {goToPrevPage && <button id="back" className="dib br3 pa3 ma3 bw2 shadow-5" type="button" onClick={goToPrevPage}>Back</button>}
            {goToNextPage && <button id="nextBtn" className="dib br3 pa3 ma3 bw2 shadow-5" type="button" onClick={goToNextPage}>Next</button>}
        </div>
    );
}

export default NavButtons;