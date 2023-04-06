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
                <h1 className="text-center">Your Orders</h1>
                <table className="table responisve">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr>
                                <td>{order._id}</td>
                                <td>
                                <span bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                {order.status}
                                    </span>
                                </td>
                                <td>{order.date}</td>
                                <td>${order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}


export default OrderPage;
