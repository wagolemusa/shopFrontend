import React from "react";
import { Link } from "react-router-dom";

function ProductPreview({ _id, name, description, price, pictures, category}) {
    return (
        <>
            <div className="conatiner">
                
                <div class="card">
                    <Link to={`/product/${_id}`} style={{cursor: "pointer", width: "13rem", margin: "1"}}>
                        <img src={pictures[0].url} class="card-img-top" alt="Fissure in Sandstone" />
                        <div class="card-body">
                            <h5 class="card-title">{name}</h5>
                            <p class="card-text">{description}</p>
                            <a href="#!" class="btn btn-primary">{category}</a>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}


export default ProductPreview;