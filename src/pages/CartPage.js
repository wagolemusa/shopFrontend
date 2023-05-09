import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation} from "../services/appApi"
import './CartPage.css'
import { Link } from "react-router-dom";

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../componets/CheckoutForm";
import Footer from "../componets/Footer";

// const stripePromise = loadStripe('pk_test_51AXQQfDtSmo7ipf18rtyXOfKlXbzQBjm3hq7TQJIFFIcBbLrufa3chFTWAt17h9ck3dZX3RJagPqYxvOmRpjTIjx00P80JJDxI')

const CartPage = () => {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;

    let cart = products.filter((product) => userCartObj[product._id] != null);
   
    console.log("cart", cart)
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading}] = useRemoveFromCartMutation();

    // Decrease from Cart
    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }


    return(
        <>
            <div className="container cart-container" style={{minHight: '96vh'}}>
                <div className="row">
                   
                    <div className="col-md-8">
                        {cart.length > 0 && (
                            <>
                                  <div class="table-responsive">
                                        <table class="table">

                                        <thead>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        {/* loop through cart pruducts */}

                                        {cart.map((item) => (
                                            <tr>
                                                <td>
                                              {!isLoading && <i className="fa fa-times" style={{marginRight: 10, marginLeft:10, cursor:"pointer" }} onClick={() => removeFromCart({productId: item._id, price: item.price, userId: user._id})}></i> }
                                                </td>
                                                <td>
                                               
                                                    <img src={item.pictures[0].url} style={{width:80, height: 50, objectFit: 'cover'}} />
                                                </td>

                                                <td>UGX {item.price}</td>

                                                <td>
                                                    <span className="quantity-indicator">
                                                        <i className="fa fa-minus-circle" onClick={() => decreaseCart({productId: item._id, price: item.price, userId: user._id})}></i>
                                                        <span>{user.cart[item._id]}</span>
                                                        <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id})}></i>
                                        
                                                    </span>
                                                </td>
                                                <td>UGX {item.price * user.cart[item._id]}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col">
                                        <Link to="/" class="btn-login">Continue</Link>
                                        </div>
                                        <div className="col">
                                        <div className="tatol btn btn-secondary btn-rounded">Total: UGX {user.cart.total}</div>
                                        </div>
                                    </div>
                                   <hr/>
                                    
                            </>     

                        )}
                    </div>
                    <div className="col-md-4">
                        
                        
                        { cart.length === 0 ?(
                            <Alert variant="info">Shoping cart is empty. Add products to your cart</Alert>
                        ): (
                            // <Elements stripe={stripePromise}>
                            //     <CheckoutForm/>
                            // </Elements>
                            <div className='cardSytle'>
                                <h1 className="pt-2 ">Delivery Address</h1>
                            <CheckoutForm/>
                            
                            </div>
                            
                        )}
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}


export default CartPage

