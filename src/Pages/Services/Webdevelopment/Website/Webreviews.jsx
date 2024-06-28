import React, { useState } from "react";

import Btgroup from "../../../Tab/Btgroup";
import Clientreviews from "./Clientreview";
import Reviewpage from "./Reviewpage";
import Certificate from "./Certificate";


const buttons = [
  { title: "Reviews", component: Reviewpage },
  { title: "Client", component: Clientreviews }, 
  { title: "Certificate", component: Certificate } 
];

function Webreviews() {
  const [selectedButton, setSelectedButton] = useState(0);
  const SelectedComponent = buttons[selectedButton].component;

  return (
    <main>
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-12">
            <Btgroup
              buttons={buttons}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
             
            />
          </div>
          <div className="col-lg-12">
            <SelectedComponent />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Webreviews;