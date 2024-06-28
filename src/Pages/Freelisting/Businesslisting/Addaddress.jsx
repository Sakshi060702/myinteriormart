import React from 'react'
import { Link } from 'react-router-dom'
import "./Businesslisting.css"

const Address = () => {
  return (

 <div className="tab" style={{ display: 'block' }}>
 <h4>Add Address Details</h4>
            <p className="add-lidting-title-from">

            </p>
            <div className="row">
                <div className="form-group col-md-4">
                    <label>Country</label>
                    <select className="wide add_bottom_10 country selectdrp">
                        <option></option>
                        <option value="india">india</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="state">State</label>
                    <select className="wide add_bottom_10 state selectdrp" id="state">
                        <option></option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label>City</label>
                    <select className="wide add_bottom_10 city selectdrp">
                        <option></option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label>Assembly</label>
                    <select className="wide add_bottom_10 assembly selectdrp">
                        <option></option>
                        <option value="Dahisar">Dahisar</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label>Pincode</label>
                    <select className="wide add_bottom_10 pincode selectdrp">
                        <option></option>
                        <option value="400068">400068</option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label>Locality</label>
                    <select className="wide add_bottom_10 locality selectdrp">
                        <option></option>
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="address">Address <span className="text-danger">*</span></label>
                    <textarea className="form-control form-control-sm" id="Address" name="Address" style={{ height: '100px' }}/>
                </div>
                <div className="text-left col-12 mt-3">
                    <Link to="/addCommunication" className="btn_1 mx-2">Back</Link>
                    <Link to="/addcategory" className="btn_1 ">Save & Continue</Link>

                </div>
            </div>
    </div>


  )
}

export default Address