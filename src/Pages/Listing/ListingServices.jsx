import React, { useState, useEffect } from "react";
import "../../Pages/Services/Webdevelopment/Website/Services.css";

function ListingServices({ companyID }) {
    const [firstCategoryName, setFirstCategoryName] = useState("");
    const [secondCategoryName, setSecondCategoryName] = useState("");
    const [thirdCategoryNames, setThirdCategoryNames] = useState([]);
    const [fourthCategoryNames, setFourthCategoryNames] = useState([]);
    const [fifthCategoryName, setFifthCategoryName] = useState([]);
    const [sixthCategoryName, setSixthCategoryName] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetServicescategory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ companyID }), 
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                // console.log(data);
                const allCategories = data.allCategories;
                let category = data.category;
                // console.log(data.allCategories)
                // console.log(category)

                if (allCategories && category) {
                    if (category.firstCategoryID) {
                       
                        const firstCategory = allCategories.find(cat => cat.firstCategoryID === category.firstCategoryID);
                        // console.log(firstCategory);
                        setFirstCategoryName(firstCategory?.firstCategoryName || "");
                       

                        if (firstCategory) {
                            
                            const secondCategory = firstCategory.secondCategories.find(cat => cat.secondCategoryId === category.secondCategoryID);
                            setSecondCategoryName(secondCategory?.secondCategoryName || "");

                            if (secondCategory) {
                                // Third Category Names
                                const thirdCategories = secondCategory.thirdCategories.filter(cat => 
                                    category.thirdCategoryID.split(",").map(id => parseInt(id)).includes(cat.thirdCategoryId)
                                ).map(cat => cat.thirdCategoryName);
                                setThirdCategoryNames(thirdCategories);

                                // Fourth Category Names
                                const fourthCategories = secondCategory.fourthCategories.filter(cat => 
                                    category.fourthCategoryID.split(",").map(id => parseInt(id)).includes(cat.fourthCategoryId)
                                ).map(cat => cat.fourthCategoryName);
                                setFourthCategoryNames(fourthCategories);

                                // Fifth Category Name
                                // const fifthCategory = secondCategory.fifthCategories.find(cat => 
                                //     cat.fifthCategoryId.toString() === category.fifthCategoryID
                                // );
                                // console.log(secondCategory.fifthCategories);
                                // console.log(fifthCategory);
                                // setFifthCategoryName(fifthCategory?.fifthCategoryName || "");


                                const fifthCategories = secondCategory.fifthCategories.filter(cat => 
                                    category.fifthCategoryID.split(",").map(id => parseInt(id)).includes(cat.fifthCategoryId)
                                ).map(cat => cat.fifthCategoryName);
                                // console.log(secondCategory.fifthCategories);
                                // console.log(fifthCategories);

                                setFifthCategoryName(fifthCategories);




                                

                                // Sixth Category Name
                                const sixthCategory = secondCategory.sixthCategories.find(cat => 
                                    cat.sixthCategoryId.toString() === category.sixthCategoryID
                                );
                                setSixthCategoryName(sixthCategory?.sixthCategoryName || "");
                                // const sixthCategories = secondCategory.sixthCategories.filter(cat => 
                                //     category.sixthCategoryID.split(",").map(id => parseInt(id)).includes(cat.sixthCategoryId)
                                // ).map(cat => cat.sixthCategoryName);
                                // setSixthCategoryName(sixthCategories);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        if (companyID) {
            fetchCategories();
        }
    }, [companyID]);

    return (
        <div className="listing-specialisat box_detail_cus">
            <h6>Services</h6>
            <ul className="listing-specialisat-list">
               
                {thirdCategoryNames.map((category, index) => (
                <li key={index}>
                    <i className="icon-check-1"></i> {category}
                </li>
            ))}
             {fourthCategoryNames.map((category, index) => (
                <li key={index}>
                    <i className="icon-check-1"></i> {category}
                </li>
            ))}
             {fifthCategoryName.map((category, index) => (
                <li key={index}>
                    <i className="icon-check-1"></i> {category}
                </li>
            ))}
             
                
                <li><i className="icon-check-1"></i>{sixthCategoryName}</li>
            </ul>
        </div>
    );
}

export default ListingServices;
