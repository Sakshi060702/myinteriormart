import React from "react";

function Searchbar(){
    return(
         <div id="results">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="wrap">
                            <div className="search">
                                <input type="text" className="searchTerm" placeholder="Search" />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Searchbar;