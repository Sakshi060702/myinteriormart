import React from "react";
import { Link } from "react-router-dom";


function Productdetails(){
    return(
        
    <div className="tab1" style={{ display: 'block' }}>
  
        <h4>Product Information</h4>
         <p className="add-lidting-title-from"></p>
        <div className="row">
      <div className="form-group col-md-4">
        <label htmlFor="fcategory2">Select Category </label>
        <select className="wide add_bottom_10 fcategory selectdrp " id="fcategory2">
          <option></option>
          <option value="scategory">scategory</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="scategory2">Select Sub-Category </label>
        <select className="wide add_bottom_10 scategory selectdrp" id="scategory2">
          <option></option>
          <option value="scategory">dasdasd</option>
          <option value="scategory">Second Category</option>
          <option value="scategory">asdasd dasdasd</option>
          <option value="scategory">asdasd dasdasdds</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="product-name">Product Name <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="product-name" id="product-name" />
      </div>
      <div className="form-group col-md-4">
        <label>Material </label>
        <select className="wide add_bottom_10 city selectdrp" name="material">
          <option></option>
          <option value="Wood">Wood</option>
          <option value="Glass">Glass</option>
        </select>
      </div>
       <div className="form-group col-md-4">
        <label>Brand Name </label>
        <select className="wide add_bottom_10 city selectdrp" name="brand-name">
          <option></option>
          <option value="brand-name">brand-name</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="height">Height <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="height" id="height" />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="weight">Weight <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="weight" id="weight" />
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="depth">Depth <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="depth" id="depth" />
      </div>
      <div className="form-group col-md-4">
        <label>Colour </label>
        <select className="wide add_bottom_10 city selectdrp" name="colour">
          <option></option>
          <option value="White">White</option>
          <option value="Black">Black</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="quantity">Quantity <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="quantity" id="quantity" />
      </div>
      <div className="form-group col-md-4">
        <label>Installation Support </label>
        <select className="wide add_bottom_10 city selectdrp" name="installation-support">
          <option></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group col-12">
        <label htmlFor="description">Description <span className="text-danger">*</span></label>
        <textarea className="form-control form-control-sm" id="description" name="description" style={{ height: '100px' }}></textarea>
      </div>
    
      <div className="text-left col-12 mt-3">
            <Link to="/Productinfo" className="btn_1 ">Save & Continue</Link>
            
      </div>
    </div>

        </div>
       
    )
}
export default Productdetails;