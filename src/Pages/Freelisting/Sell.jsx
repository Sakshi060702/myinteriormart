import React,{useState} from "react";
import { Link } from "react-router-dom";

import Trialpage from "./Trialpage";


function Sell(){

     const [showNextPage, setShowNextPage] = useState(false);

  const handleNextClick = () => {
    setShowNextPage(true);
  };

  const someMethod = () => {
    // Do something here
    console.log("Method called from Trialpage");
  };
    return(
        <>
        <h1>Hello World to everyone</h1>
      {showNextPage ? (
        <Trialpage someMethod={someMethod} />
      ) : (
       <Link to="/trialpage">
          Next
        </Link>
      )}
        
        </>
    )
}
export default Sell;