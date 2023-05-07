import axios from "../axios";
import React, { useEffect, useState} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../componets/Loading";
import './ProductPage.css'
import SimilarProduct from "../componets/SimilarProduct";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../componets/ToastMessage";
import Footer from "../componets/Footer";


function ProductPage() {
    const {id} = useParams();
    const user =  useSelector(state =>  state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null)
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({data}) => {
            setProduct(data.product);
            setSimilar(data.similar)
        })
    },[id])

   console.log(similar)

    if(!product){
        return<Loading />
    }


    const responsive = {
        0:{items: 1},
        568: {items: 2},
        1024: {items: 3}
    }
    const images = product.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return(
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-md-6 showImage">
                        <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />

                    </div>

                    <div className="col-md-6 showProduct">
                        <h1>{product.name}</h1>
                       
                        <p style={{ textAlign: "justify" }} className="py-3">
                            {product.description}
                        </p>
                        
                        <div class="btn-group" role="group" aria-label="Basic example">
                            {/* {user && !user.isAdmin &&(
                           
                                <select class="form-select" style={{ width: "35%" }}>
                                <option selected>Quantity</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                 </select>
                            )} */}
                        </div>
                      
                        <div class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            <div class="fw-bold">Price</div>
                          
                            </div>
                            <span class="btn btn-outline-secondary btn-rounded">UGX {product.price}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                            <div class="fw-bold">Category</div>
                          
                            </div>
                            <span class="btn btn-outline-secondary btn-rounded">{product.category}</span>
                        </li>

                      
                         <button type="button" class="btn-primary1" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}>Add to Cart</button>

                        </div>
                      

                        {isSuccess && <ToastMessage  bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}
                    </div>


                </div>

                <div className="my-4 similaPro">
                <h2>Similar Products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>

            </div>
            <Footer />
        </>
    )
}

export default ProductPage;


