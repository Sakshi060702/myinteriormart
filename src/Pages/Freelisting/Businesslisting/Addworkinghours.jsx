import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../FrontEnd/css/Mangelisting.css";
import nextarrowimg from "../../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh"
import Popupalert from "../../Popupalert";
import useAuthCheck from "../../../Hooks/useAuthCheck";
import { width } from "@fortawesome/free-solid-svg-icons/faL";

function Addworkinghours()
{
    const [workingHours, setWorkingHours] = useState({
        MondayFrom: "10:00:00",
        MondayTo: "07:00:00",
        TuesdayFrom: "10:00:00",
        TuesdayTo: "07:00:00",
        WednesdayFrom: "10:00:00",
        WednesdayTo: "07:00:00",
        ThursdayFrom: "10:00:00",
        ThursdayTo: "07:00:00",
        FridayFrom: "10:00:00",
        FridayTo: "07:00:00",
        SaturdayFrom: "00:00:00",
        SaturdayTo: "00:00:00",
        SundayFrom: "00:00:00",
        SundayTo: "00:00:00",
        SaturdayHoliday: false,
        SundayHoliday: false,
      });
    
      const navigate = useNavigate();
      const token=useSelector((state)=>state.auth.token);
    

      const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const isAuthenticated=useAuthCheck();

    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response =await fetch(
            `https://apidev.myinteriormart.com/api/BinddetailsListing/GetWorkingDetailslisting`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
          }
          );
    
          const result=await response.json();
    
          const formatTime = (timeString) => {
            const date = new Date(timeString);
            return date.toTimeString().split(" ")[0];
          };
    
          setWorkingHours({
            MondayFrom: formatTime(result.mondayFrom),
              MondayTo: formatTime(result.mondayTo),
              TuesdayFrom: formatTime(result.tuesdayFrom),
              TuesdayTo: formatTime(result.tuesdayTo),
              WednesdayFrom: formatTime(result.wednesdayFrom),
              WednesdayTo: formatTime(result.wednesdayTo),
              ThursdayFrom: formatTime(result.thursdayFrom),
              ThursdayTo: formatTime(result.thursdayTo),
              FridayFrom: formatTime(result.fridayFrom),
              FridayTo: formatTime(result.fridayTo),
              SaturdayFrom: formatTime(result.saturdayFrom),
              SaturdayTo: formatTime(result.saturdayTo),
              SundayFrom: formatTime(result.sundayFrom),
              SundayTo: formatTime(result.sundayTo),
              SaturdayHoliday: result.saturdayHoliday,
              SundayHoliday: result.sundayHoliday,
          })
        }
        catch(error)
        {
          console.error("Error fetching data:", error);
        }
      };
      if(isAuthenticated)
      {
        fetchData();
      }
     
    },[token]);
    
      const handleCopyToAll = () => {
        const { MondayFrom, MondayTo } = workingHours;
        setWorkingHours({
          ...workingHours,
          TuesdayFrom: MondayFrom,
          TuesdayTo: MondayTo,
          WednesdayFrom: MondayFrom,
          WednesdayTo: MondayTo,
          ThursdayFrom: MondayFrom,
          ThursdayTo: MondayTo,
          FridayFrom: MondayFrom,
          FridayTo: MondayTo,
        });
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWorkingHours({
          ...workingHours,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(
            "https://apidev.myinteriormart.com/api/WorkingHours/WorkingHours",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify(workingHours),
            }
          );
    
          const result = await response.json();
          console.log(result);
          // console.log("Working hours token",token);
         
          const cityName = localStorage.getItem('cityname');
        const pathlisting = `/addpayment/${cityName}`;


          setSuccessMessage("Working Hours Details Saved Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate(pathlisting);
      }, 2000);

          
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("Failed to save Working Hours details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
        }
      };

      const handleClosePopup = () => {
        setShowPopup(false);
      };
    
    return(
<>
        <div >
        <div >
          <div >
            <div >
              <h4>Add Working Hours</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Working Hours
                
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                    onClick={handleCopyToAll}
                  >
                    Copy to All
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {Object.keys(workingHours).map((key) => (
                    <div key={key} className=" col-md-6">
                      {key === "SaturdayHoliday" ||
                      key === "SundayHoliday" ? null : (
                        <div className="form-group">
                          <label>
                            {key}<span className="text-danger">*</span>
                            <input
                              className="form-control form-control-sm input-width workinghoursw"
                            
                              type={
                                key.includes("Holiday") ? "checkbox" : "time"
                              }
                              name={key}
                              checked={
                                key.includes("Holiday")
                                  ? workingHours[key]
                                  : undefined
                              }
                              value={
                                !key.includes("Holiday")
                                  ? workingHours[key]
                                  : undefined
                              }
                              onChange={handleChange}
                              required
                           
                            />
                          </label>
                        </div>
                      )}
                     
                      {key === "FridayFrom" && (
                        <>
                        
                        <div className="col-md-12">
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes1 float-left">
                              <label className="container_check">
                                Saturday Holiday
                                <input
                                  className="form-control form-control-sm"
                                  type="checkbox"
                                  name="SaturdayHoliday"
                                  checked={workingHours["SaturdayHoliday"]}
                                  onChange={handleChange}
                                  style={{ width: "auto" }}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                        </>
                      )}
                      {key === "SaturdayFrom" && (
                        <div className="col-md-12">
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes1 float-left">
                              <label className="container_check">
                                Sunday Holiday
                                <input
                                  className="form-control form-control-sm"
                                  type="checkbox"
                                  name="SundayHoliday"
                                  checked={workingHours["SundayHoliday"]}
                                  onChange={handleChange}
                                  style={{ width: "auto" }}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                   <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1 freelistingpagebtn" >
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                      <Link to={`/addspecialisation/${localStorage.getItem('cityname')}`}>
                        <img
                          src={previousarrowimg}
                          style={{ height: "30px" }}
                        />
                      </Link>
                      <Link to={`/addpayment/${localStorage.getItem('cityname')}`}>
                        <img src={nextarrowimg} style={{ height: "30px" }} />
                      </Link>
                    </div>
                  </div>
                  {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
          />
          )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
            {Object.keys(workingHours).map((key) => (
                <div key={key}>
                    <label>
                        {key}
                        <input
                            type={key.includes('Holiday') ? 'checkbox' : 'text'}
                            name={key}
                            value={workingHours[key]}
                            onChange={handleChange}
                            checked={workingHours[key] === true}
                        />
                    </label>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form> */}
    </>
  );
};

export default Addworkinghours;