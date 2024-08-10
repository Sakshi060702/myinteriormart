import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Btgroup from "../../../Tab/Btgroup";
import Clientreviews from "./Clientreview";
import Reviewpage from "./Reviewpage";
import Certificate from "./Certificate";
import Review1 from "../../../Listing/Review1";

const buttons = [
  { title: "Reviews", component: Review1 },
  { title: "Client", component: Clientreviews },
  { title: "Certificate", component: Certificate },
];

function Webreviews() {
  const { listingId } = useParams();
  const [selectedButton, setSelectedButton] = useState(0);
  const SelectedComponent = buttons[selectedButton].component;

  return (
    <main>
      <div className="company-listing-tab">
        <div className="step">
          <ul className="nav nav-tabs" id="tab_checkout" role="tablist">
            {buttons.map((button, index) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
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
          {console.log(listingId)}
          <SelectedComponent listingID={listingId} />
        </div>
      </div>
    </main>
  );
}

export default Webreviews;
