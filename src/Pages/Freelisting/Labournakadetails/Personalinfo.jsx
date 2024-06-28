import React from "react";

import { Link } from "react-router-dom";

function Personalinfo(){
    return(
        
         <div className="tab1" style={{ display: 'block' }}>
            <h4>Personal Information</h4>
            <p className="add-lidting-title-from">
                {/* Business Listing / Add Communication Details */}
            </p>
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <div className="drpdiv">
                        <input className="form-control form-control-sm" type="text" name="name" id="name" />

                    </div>

                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="surname">Surname <span className="text-danger">*</span></label>
                    <div className="drpdiv">
                         <input className="form-control form-control-sm" type="text" name="surname" id="surname" />

                    </div>
                   
                </div>
                <div className="form-group col-md-4">
                    <label>Religion </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="religion">
                        <option></option>
                        <option value="Religio">Religio</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Cast </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="cast">
                        <option></option>
                        <option value="Cast">Cast</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Languages </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="languages">
                        <option></option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                    </select>

                    </div>
                    
                </div>
                <div class="form-group col-md-4">
                    <label for="age">Age <span
                            class="text-danger">*</span></label>
                            <div className="drpdiv">
                                <input className="form-control form-control-sm" type="text" name="name" id="name" />

                            </div>
                    
                </div>
                 <div className="form-group col-md-4 column">
                    <label>Colour </label>
                    <div className="drpdiv">
                    <select className="wide add_bottom_10 city form-group-border selectdrp" name="colour">
                        <option></option>
                        <option value="Fair">Fair</option>
                        <option value="Light Brown">Light Brown</option>
                        <option value="Olive">Olive</option>
                        <option value="Brown">Brown</option>
                    </select>

                    </div>

                </div>
                <div className="form-group col-md-4">
                    <label>Height </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="height">
                        <option></option>
                        <option value="3 - 4 feet">3 - 4 feet</option>
                        <option value="4 - 5 feet">4 - 5 feet</option>
                        <option value="5 - 6 feet">5 - 6 feet</option>
                    </select>

                    </div>
                    
                </div>
                <div classNAME="form-group col-md-4" style={{ marginLeft: '10px' }}> 
                    <label>Education </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="education">
                        <option></option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Under Graduate">Under Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Marital status </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="marital-status">
                        <option></option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Children (Boy) </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="boy-child">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Children (Girl) </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="girl-child">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Veg or Non-veg </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="veg-non-veg">
                        <option></option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-vegetarian">Non-vegetarian</option>
                    </select>

                    </div>
                    
                </div>
                <div className="form-group col-md-4">
                    <label>Habits </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="habits">
                        <option></option>
                        <option value="Smoking">Smoking</option>
                        <option value="Drinking">Drinking</option>
                        <option value="Chewing tobacco">Chewing tobacco</option>
                        <option value="Non of these">Non of these</option>
                    </select>

                    </div>

                </div>
                <div className="form-group col-md-4">
                    <label>From </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 state form-group-border selectdrp" name="state">
                        <option></option>
                        <option value="Maharastra">Maharastra</option>
                        <option value="Goa">Goa</option>
                    </select>

                    </div>

                </div>
                <div className="form-group col-md-4" >
                    <label>City </label>
                    <div className="drpdiv">
                        <select className="wide add_bottom_10 city form-group-border selectdrp" name="city" >
                        <option></option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                    </select>
                    </div>
                    
                </div>
                {/* More form fields... */}
                <div className="text-left col-12 mt-3">
                    
            <Link to="/Workingdetails" className="btn_1 ">Save & Continue</Link>
                </div>
            </div>
        </div>
          
    )
}
export default Personalinfo;





