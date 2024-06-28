import React, { useState } from "react";
import Labournakaclientreviews from "./Labournakaclientreview";
import Labournakaclient from "./Labournakaclient";
import Btgroup from "./Btgroup";
import "./labournakastyle.css"

const buttons = [
  { title: "Reviews", component: Labournakaclientreviews },
  { title: "Client", component: Labournakaclient } // Adjust this accordingly
];

function Labournakareviews() {
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

export default Labournakareviews;