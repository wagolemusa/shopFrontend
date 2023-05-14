import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './OrderPage.css';
import axios from '../axios'
import Loading from "../componets/Loading";

function OrderPage() {

    const user = useSelector(state => state.user);
    const products = useSelector(state => state.products);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data)
                console.log(data)
            })
            .catch((e) => {
                setLoading(false);
                console.log(e)
            })
    }, []);

    if(loading){
        return <Loading />;
    }
    if(orders.length === 0){
        return (
            <>
                <h1 className="text-center pt-3">No Orders Yet</h1>
            </>
        )
    }

    return (
        <div>
            <div className="container">
                <h1 className="text-center py-3">Your Orders</h1>
                <div class="table-responsive">
                    <table class="table">


                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>Status</th>
                            <th>Product Qty</th>
                            <th>Date</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr>
                                <td>{order._id}</td>
                                <td>
                                <span className={`${order.status === "processing" ? "btn btn-outline-warning btn-rounded" : "btn btn-outline-success btn-rounded"}`} text="white">
                                {order.status}
                                    </span>
                                </td>
                                <td>{order.count}</td>
                                <td>{order.date}</td>
                                <td>UGX {order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>

        </div>
    )
}


export default OrderPage;
