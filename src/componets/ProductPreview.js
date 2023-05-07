import React from "react";
import { Link } from "react-router-dom";
import '../pages/Home.css'
function ProductPreview({ _id, name,  price, pictures, category}) {
    return (
        <>
          
                <div className="row">
                    <div className="col-md-3">
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
            </div>
        </>
    )
}


export default ProductPreview;