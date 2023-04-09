import React from "react";
import { Link } from "react-router-dom";
import '../pages/Home.css'
function ProductPreview({ _id, name,  price, pictures, category}) {
    return (
        <>
          
                
                <div class="card1">
                    <Link to={`/product/${_id}`} style={{cursor: "pointer", width: "13rem", margin: "1"}}>
                        <img src={pictures[0].url} class="card-img-top" alt="Fissure in Sandstone" />
                      
                            <h5 class="cardTitel">{name}</h5>
                        
                        <div className="price"> 
                            <button type="button" class="btn btn-rounded ">UGX {price}</button>
                        </div>
                        {/* <div className="price1"> 
                            <button type="button" class="btn btn-rounded ">{category}</button>
                        </div> */}
                    </Link>
                </div>
            
        </>
    )
}


export default ProductPreview;