import React,{useState} from "react";

import Btngroup from "./Btngroup";
import SelectCategory from "./SelectCategory";
// import Managelisting from "./Businesslisting/Managelisting";
import Busineslisting from "./Businesslisting/Businesslisting";
import Labournaka from "./Labournakapage";
import Buy from "./Buypage";
import Sell from "./Sell";
import Job from "./Jobpage";

const buttons=[
    "Select Category",
    "Business Listing",
    "Labour Naka",
    "Buy",
    "Sell",
    "Job",

]

const RenderComponent=({index})=>
    {
        switch(index){
            case 0:return <SelectCategory/>;
            
            case 1:return <Busineslisting/>;
            
            case 2:return<Labournaka/>;
            
            case 3:return<Buy/>;
            
            case 4:return<Sell/>;

            case 5: return<Job/>;

            default:
                return null;
        }
    }


function Freelisting(){
const[isSelected,setisSelected]=useState(0)
    return(

        <main>
			<div class="container margin_60_35">
				<div class="row">
					<div class="col-lg-3" id="desktop_view">
						<div class="nav profile-side-menu  flex-column nav-pills" id="v-pills-tab" role="tablist"
							aria-orientation="vertical">
                                <Btngroup buttons={buttons} isSelected={isSelected} setisSelected={setisSelected}/>
                        </div>
                    </div> 
                    <div class="col-lg-9 px_remove"  id="create_listing">
                        <div class="tab-content profile-sidebar-content" id="v-pills-tabContent">           
                            <RenderComponent index={isSelected} />
                        </div>
                     </div>
                </div>  
            </div>      
        </main>   
    )
}
export default Freelisting;