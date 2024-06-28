import React ,{useState} from "react";
import { useEffect } from "react";
import ContractorImage from '../../../FrontEnd/img/banner/Contractor.jpg';


import fslide from '../../../FrontEnd/img/banner/Dream Land Home.jpg'
import sslide from '../../../FrontEnd/img/banner/Furniture.jpg'


function Contractor(){
    const[catContractor,setcatContractor]=useState([]);

    useEffect(()=>{
        fetch('https://apidev.myinteriormart.com/api/Category/GetCategories')
        .then(response=>response.json())
        .then(data=>setcatContractor(data.contractors))
        .catch(error=>console.error('Error fetching data :',error));
    },[]);

    const displayedCategories=catContractor.slice(16,33);
    const initialCategories = catContractor.slice(0, 16);
  


    return(
        <>
 <div className="category-featured">
     <div className="show-brand">
         <div className="row">
        <div className="col-lg-2 col-md-12 category-list">
            <div className="navbar-brand">
                <button className="btn btn-link navbar-brand-btn" type="button">CONTRACTOR</button>
            </div>
            <div className="navbar-brand-offer-menu">
                 <button className="btn btn-link navbar-brand-offer-btn" type="button">CONTRACTOR</button>
            </div>
            <div className="mim-HomeSideMenu">
                <ul>
                    {displayedCategories.map(cat =>{
                         const icon =`/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;
                       

                         return(
                             <li className="mim-box-list" key={cat.id}>
                                <a href={`/Third/${cat.imageURL}`} title={cat.searchKeywordName}>
                                    <img src={icon} alt={cat.searchKeywordName} className="img-fluid" />
                                    {cat.name}
                                </a>
                            </li>
                         );
                    })}
                    <li className="mim-box-list">More &gt;&gt;</li>
                </ul>
            </div>
        </div>
        <div className="col-lg-10 col-md-12 brand-category-list">
                        <div className="mim-Box">
                            <div className="row no-gutters">
                                <div className="col-md-4 mim-Box-img">
                                    <img src={ContractorImage} className="img-fluid" alt="Banner" />
                                </div>
                                <div className="col-md-8">
                                    <div className="tab-content checkout" id="myTabContent">
                                        <div className="tab-pane fade show active" id="cutomize" role="tabpanel" aria-labelledby="cutomize">
                                            <div className="row no-gutters">
                                                {initialCategories.map(cat => {
                                                    const icon = `/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;
                                                    return (
                                                        <div className="col-md-3 col-sm-3 col-3 mim-Box-item" key={cat.id}>
                                                            <a href={`/Third/${cat.imageURL}`}>
                                                                <img src={icon} className="img-fluid" alt={cat.name} />
                                                                <p>{cat.name}</p>
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="monopoly" role="tabpanel" aria-labelledby="monopoly">
                                            dasd1a231d31sad
                                        </div>
                                        <div className="tab-pane fade" id="latest" role="tabpanel" aria-labelledby="latest">
                                            dasd1a231d31sad
                                        </div>
                                        <div className="tab-pane fade" id="running" role="tabpanel" aria-labelledby="running">
                                            dasd1a231d31sad
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        </div>
    </div>
 </div>
<div class="row py-1">
               <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={fslide} className="img-fluid" alt="First Slide" />
                     
                    </div>
                    <div class="carousel-item">
                        <img src={sslide} className="img-fluid" alt="Second Slide" />

                     
                    </div>
                    
                  </div>
                </div>
            </div>

        </>
    );
}
export default Contractor;