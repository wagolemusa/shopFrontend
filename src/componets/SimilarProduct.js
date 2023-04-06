import React from "react";
import { Link } from "react-router-dom";
function SimilarProduct({ _id, name, category, pictures }) {
    return (
        <>
            <div className="conatiner">
                <div className="row">
                    <>
                        <Link to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "1" }}>
                            <img src={pictures[0].url} class="card-img-top" alt="Fissure in Sandstone" style={{ height: "150px", objectFit: 'cover' }} />
                            <div class="card-body">
                                <h5 class="card-title">{name}</h5>
                                {/* <p class="card-text">{description}</p> */}
                                <a href="#!" class="btn btn-primary">{category}</a>
                            </div>
                        </Link>
                    </>



                </div>
            </div>
        </>
    )
}


export default SimilarProduct;

