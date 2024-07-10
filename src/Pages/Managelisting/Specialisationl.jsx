import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Specialisationl() {
  const navigate = useNavigate();
  const [specialisations, setSpecialisations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of specialisations from the API
    const fetchSpecialisations = async () => {
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/Specialisation/GetSpecialisations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        // Check if response is OK and parse JSON
        if (response.ok) {
          const data = await response.json();
          const initialState = data.reduce((acc, item) => {
            acc[item.name] = false; // Initialize each specialisation with false
            return acc;
          }, { selectAll: false });
          setSpecialisations(initialState);
        } else {
          console.error(`Error fetching specialisation details: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching specialisation details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialisations();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSpecialisations({ ...specialisations, [name]: checked });
  };

  const handleSelectAll = () => {
    const newState = Object.keys(specialisations).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setSpecialisations(newState);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/Specialisation/CreateSpecialisation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(specialisations)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Specialization Details created successfully") {
          navigate("/workinghoursl");
        } else {
          console.error("Error submitting specialisation details: ", data);
        }
      } else {
        console.error(`Error submitting specialisation details: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting specialisation details", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Specialisation Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Specialisation Details
                <span>
                  <Link className="back_btn mx-3" to="/categoryl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                    <button className="btn btn-primary" style={{ backgroundColor:'#fb830d' }} onClick={handleSelectAll}>
                      Select All
                    </button>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Select all
                        <input
                          type="checkbox"
                          id="selectAll"
                          name="selectAll"
                          checked={specialisations.selectAll}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Render each specialisation checkbox */}
                {Object.keys(specialisations).filter(key => key !== "selectAll").map(key => (
                  <div className="col-md-3" key={key}>
                    <div className="clearfix add_bottom_15">
                      <div className="checkboxes float-left">
                        <label className="container_check">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          <input
                            type="checkbox"
                            id={key}
                            name={key}
                            checked={specialisations[key]}
                            onChange={handleCheckboxChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="text-left col-12 mt-3">
                  <button className="btn_1" onClick={handleSubmit}>
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Specialisationl;
