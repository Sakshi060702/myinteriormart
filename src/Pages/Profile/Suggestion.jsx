import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";


function Suggestion() {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title,
      suggestion,
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Suggestion/AddSuggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      // Reset form fields after successful submission
      setTitle("");
      setSuggestion("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Suggestion</h5>
          <form className="icon-form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-12">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group col-12">
                <label>Description</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="suggestion"
                  style={{ height: "100px" }}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                ></textarea>
              </div>

              <div className="text-center col-12 mt-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn_1 full-width"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Suggestion;
