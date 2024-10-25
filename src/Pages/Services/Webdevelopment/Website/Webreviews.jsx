import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import Btgroup from "../../../Tab/Btgroup";
import Clientreviews from "./Clientreview";
import Reviewpage from "./Reviewpage";
import Certificate from "./Certificate";
import Review1 from "../../../Listing/Review1";

const allbuttons = [
  { title: "Reviews", component: Review1 },
  { title: "Our Client", component: Clientreviews },
  { title: "Certificates", component: Certificate },
];

function Webreviews(props) {
  const { listingId } = useParams();
  console.log("Listing ID:", listingId, props);
  const [selectedButton, setSelectedButton] = useState(0);
  // const SelectedComponent = buttons[selectedButton].component;
 
const[status,setStatus]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Keywordshowfromstatus/GetKeywordshow",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: props.companyID,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setStatus(data.data.status);
        console.log("Status inside fetch:", data.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, []);

  const buttons=allbuttons.filter((button)=>{
    if(status===1){
      return true;
    }
    else{
      return button.title==='Reviews';
    }
  })

  const SelectedComponent = buttons[selectedButton]?.component || Review1;

  return (
    <main>
      <div className="company-listing-tab listingreviews">
        <div className="step">
          <ul className="nav nav-tabs" id="tab_checkout" role="tablist">
            {buttons.map((button, index) => (
              <li className="nav-item " key={index}>
                <a
                  className={`nav-link webreview ${
                    selectedButton === index ? "active" : ""
                  }`}
                  id={`${button.title.toLocaleLowerCase()}-tab`}
                  data-toggle="tab"
                  role="tab"
                  aria-controls={button.title.toLowerCase()}
                  aria-selected={selectedButton === index}
                  onClick={() => setSelectedButton(index)}
                  style={{ cursor: "pointer" }}
                >
                  {button.title}
                </a>
              </li>
            ))}
          </ul>
          {/* {console.log(props)} */}
          <SelectedComponent listingID={props} />
        </div>
      </div>
    </main>
  );
}

export default Webreviews;
