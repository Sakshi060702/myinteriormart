import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";

function ThirdCategoryList(){
    const{categoryUrl}=useParams();
    const[thirdCategories, setThirdCategories]=useState([]);

    useEffect(()=>{
        async function fetchThirdCategories(){
            try{
                const response=await fetch(`https://apidev.myinteriormart.com/api/SubCategories/GetSubCategories/${categoryUrl}`);
                const data=await response.json();
                setThirdCategories(data);
            }
            catch(error){
                console.error('Error fetching third categories',error);

            }
        }
        fetchThirdCategories();

    },[categoryUrl]);

    return(
        <div className="third-category-list">
            <h2>Third Cateories for{categoryUrl}</h2>
            <ul>
                {thirdCategories.map(thirdCat=>(
                    <li key={thirdCat.secondCategoryId}>{thirdCat.Name}</li>
                ))}
            </ul>

        </div>
    )

}
export default ThirdCategoryList;