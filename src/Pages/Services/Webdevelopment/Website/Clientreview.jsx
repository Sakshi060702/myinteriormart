import React from 'react'


import accessImage from '../../../../FrontEnd/img/access_bg.jpg';
import furnitureImage from '../../../../FrontEnd/img/furniture-design.jpg'
import furnitureImage1 from '../../../../FrontEnd/img/furniture-design1.jpg'
import furnitureImage2 from '../../../../FrontEnd/img/listing-img.jpeg'



const Clientreview = () => {
  return (
   
<div className="labournakaclient-container">
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          <img src={accessImage} alt="clientimg" className="labournakaclient-img" />
        </div>
      </div>
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          <img src={furnitureImage} alt="clientimg" className="labournakaclient-img" />
        </div>
      </div>
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          <img src={furnitureImage1} alt="clientimg" className="labournakaclient-img" />
        </div>
      </div>
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          <img src={furnitureImage2} alt="clientimg" className="labournakaclient-img" />
        </div>
      </div>
    </div>

                                            

                                        
  )
}

export default Clientreview