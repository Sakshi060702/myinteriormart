import React,{useState} from "react";

function Search(){
    const[searchTerm,setSearchTerm]=useState("");
    const[result,setResult]=useState([]);

    const handleInputChange=(e)=>{
        setSearchTerm(e.target.value);
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(searchTerm.trim()===""){
            return;
        }
        try{
            const response = await fetch('');
            const data=await response.json();
            setResult(data);
            console.log(data);
        }
        catch(error)
        {
            console.error("Error fetching is ",error);
        }
    }

    return (
      <div className="results">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search" value={searchTerm} onChange={handleInputChange}/>
                    <button type="submit" className="searchButton" onClick={handleSubmit}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search-results">
            {result.length>0 &&(
                <ul>
                    {result.map((result,index)=>(
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    );
}

export default Search;