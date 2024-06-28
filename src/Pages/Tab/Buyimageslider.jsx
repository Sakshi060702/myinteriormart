import React  from "react";
import Homeimage from '../../FrontEnd/img/access_bg.jpg'; 
import Furnitureimage from '../../FrontEnd/img/furniture-design.jpg';
import Furnitureimage1 from '../../FrontEnd/img/furniture-design1.jpg';



function Buyimageslider(){
    return(
        <>
        <div className="col-lg-4 col-md-12 company-map padding-all-5">
    <div id="carouselExampleControls" className="carousel slide buy_slide" data-ride="carousel">
        <div className="carousel-inner gallery">
            <div className="carousel-item active">
                <a href="FrontEnd/img/access_bg.jpg" className="big">
                     <img src={Homeimage} alt="profile" />
                    
                </a>
            </div>
            <div className="carousel-item">
                <a href="FrontEnd/img/furniture-design.jpg" className="big">
                      <img src={Furnitureimage} alt="profile" />
                </a>
            </div>
            <div className="carousel-item">
                <a href="FrontEnd/img/furniture-design1.jpg" className="big">
                      <img src={Furnitureimage1} alt="profile" />
                </a>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <i className="fa fa-chevron-left" aria-hidden="true" style={{ color: '#fff', fontSize: '22px' }}></i>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <i className="fa fa-chevron-right" aria-hidden="true" style={{ color: '#fff', fontSize: '22px' }}></i>
            <span className="sr-only">Next</span>
        </a>
    </div>

    <div className="mt-2">
        <p className="m-0">
            Day: Ago
            <span style={{ float: 'right' }}>
                <a href="#">View</a>
            </span>
        </p>
    </div>
</div>
        </>
    )
}
export default Buyimageslider;