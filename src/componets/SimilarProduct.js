import React from "react";
import { Link } from "react-router-dom";
function SimilarProduct({ _id, name, category, pictures, price }) {
    return (
        <>
            <div className="conatiner">
                

                    <div class="card1">
                    <Link to={`/product/${_id}`} style={{cursor: "pointer", width: "13rem", margin: "1"}}>
                        <img src={pictures[0].url} class="card-img-top" alt="Fissure in Sandstone" />
                      
                            <h5 class="cardTitel">{name}</h5>
                        
                        <div className="price"><br/>
                            <button type="button" class="btn btn-rounded ">UGX {price}</button>
                        </div>

                         <div className="price1"> 
                            <Link to="/category/all">
                                See More 
                            </Link>
                        </div> 
                    </Link>
                </div>


            </div>
        </>
    )
}


export default SimilarProduct;

