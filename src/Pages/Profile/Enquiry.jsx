import React, { useState,useEffect } from "react";
import user from '../../FrontEnd/img/listing-img.jpeg'
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";


function Enquiry() {
	const [enquiries, setEnquiries] = useState([]);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		fetch('https://apidev.myinteriormart.com/api/ListingsEnquiry/GetEnquiries', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${token}`, 
		  },
		})
		  .then(response => response.json())
		  .then(data => setEnquiries(data))
		  .catch(error => console.error('Error fetching enquiries:', error));
	  }, [token]);

  return (
    <div>
      <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        <div className="add-review">
          <h5>Enquiry</h5>
          <div className='list_general'>
            {enquiries.length > 0 ? (
              enquiries.map(enquiry => (
                <div key={enquiry.enquiryID} className="li">
                  <a href="#">
                    <div className="strip map_view px-4 py-3">
                      <div className="enquiry_date">
                        {new Date(enquiry.createdDate).toLocaleDateString()}
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                          <div className="enquiry_list_heading">Full Name <span>:</span></div>
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="enquiry_list_txt">{enquiry.fullName}</div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                          <div className="enquiry_list_heading">Mobile Number <span>:</span></div>
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="enquiry_list_txt">{enquiry.mobileNumber}</div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                          <div className="enquiry_list_heading">Email Id <span>:</span></div>
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="enquiry_list_txt">{enquiry.email}</div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                          <div className="enquiry_list_heading">Enquiry Title <span>:</span></div>
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="enquiry_list_txt">{enquiry.enquiryTitle}</div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-3 col-4">
                          <div className="enquiry_list_heading">Message<span>:</span></div>
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="enquiry_list_txt">
                            {enquiry.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <p>No enquiries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Enquiry;
