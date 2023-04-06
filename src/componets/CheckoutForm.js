import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useReducer, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { useCreateOrderMutation } from '../services/appApi';

function CheckoutForm(){

    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError,isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [paying, setPaying] = useState(false)

    async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:5000/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        navigate("/orders");
                    }, 3000);
                }
            });
        }
    }
    return(
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7'>
                        <form onSubmit={handlePay}>
                            <h2>{alertMessage && <Alert>{alertMessage}</Alert>}</h2>

                            <div class="form-outline">
                                <input type="text" id="form12"  class="form-control" value={user.name} disabled/>
                            
                            </div>
                            <div class="form-outline">
                                <input type="text" id="form12" class="form-control" value={user.email} disabled/>
                                
                            </div>
                            <div class="form-outline">
                                <input type="text" id="form12" class="form-control" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                
                            </div>
                            <div class="form-outline">
                                <input type="text" id="form12" class="form-control" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required/>
                                
                            </div>

                            <label htmlFor="card-element">Card</label>
                            <CardElement id="card-element" />

                            <button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                                    {paying ? "Processing..." : "Pay"}
                            </button>
                        </form>
                    </div>
                </div>    
            </div>   
        </>
    )
}

export default CheckoutForm;
