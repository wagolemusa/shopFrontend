import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  axios from "../axios";
import Loading from "./Loading";

const OrdersAdminPage = () => {
    const user = useSelector(state => state.user);

    const [orders, setOrders ] = useState([])
    const [ loading, setLoading ] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToshow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    function markShipped(orderId, ownerId){
        axios
            .patch(`/orders/${orderId}/mark-shipped`, {ownerId})
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true)
        axios.get('/orders')
        .then(({data}) => {
            setLoading(false)
            setOrders(data);
        })
        .catch((e) => {
            setLoading(false)
        })
    }, []);


    if(loading){
        return <Loading />;
    }


    if(orders.length === 0){
        return(
            <>
                <h1 className="text-center pt-4">No Orders Yet</h1>
            </>
        )
    }

    return(
        <>
                <table className="table responisve">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Count</th>
                            <th>Total</th>
                            <td>Address</td>
                            <td>Status</td>                           
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.owner?.name}</td>
                                <td>{order.count}</td>
                                <td>{order.total}</td>
                                <td>{order.address}</td>
                                <td>
                                {order.status === "processing" ? (
                                <button onClick={() => markShipped(order._id, order.owner?._id)}>Mark as shipped</button>
                                ) :(

                                    <span class="badge bg-primary text-dark">Shipped</span>
                               )}
                                
                                </td>
                                <td>
                                    <span style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => showOrder(order.products)}>
                                        View order <i className="fa fa-eye"></i>
                                    </span>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

 
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" show={show} >
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        {orderToshow.map(order => (
                        <div className="order-details__container d-flex justify-content-around py-2">
                            <img src={order.pictures[0].url} style={{maxWidth: 100, height:100, objectFit: "cover"}} />

                            <p>
                                <span>{order.count} x </span> {order.name}
                            </p>
                            <p>Price: ${Number(order.price) * order.count}</p>
                        </div>
                    ))}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>

    
        </>
    )
}

export default OrdersAdminPage;


