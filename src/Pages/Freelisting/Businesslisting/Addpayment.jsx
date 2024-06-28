import React from "react";
import { Link } from "react-router-dom";

function Addpayment()
{
    return(

 <div className="tab" style={{ display: 'block' }}> 
<h4>Add Payment Mode</h4>
    <p className="add-lidting-title-from">
        {/* Business Listing / Add Payment Mode */}
    </p>
    <div className="row">
        <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Cash
                        <input type="checkbox" id="Cash" name="Cash" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Cheque
                        <input type="checkbox" id="Cash" name="Cheque" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">RTGS & NEFT
                        <input type="checkbox" id="Cash" name="RTGS&NEFT" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Debit Card
                        <input type="checkbox" id="Cash" name="Debit Card" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Credit Card
                        <input type="checkbox" id="Cash" name="Credit Card" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
                <div className="col-md-4 col-6">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Net Banking
                        <input type="checkbox" id="Cash" name="Credit Card" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        
        <div className="text-left col-12 mt-3">
        <Link to="/addworkinghours" className="btn_1 mx-2">Back</Link>
        <Link to="" className="btn_1 ">Submit</Link>
        </div>
    </div>

        </div>
        
    )
}

export default Addpayment;