import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import { Link } from "react-router-dom";
import categories from "../Categories";
import './Home.css'
// import { updateProducts } from "../features/productSlice";
import ProductPreview from '../componets/ProductPreview'

const Home = () => {

    const dispatch = useDispatch()
    // const products = useSelector((state) => state.products);
    // const lastProducts = products.toString().slice(0, 8);

    const [products, setProducts] = useState([])
    const [loading, setLoading ] = useState(false);

    console.log("ppp", products)

    useEffect(() => {
        setLoading(true);
        axios
            .get('/products')
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, []);


    // useEffect(() => {
    //     axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
    // }, []);
    return (
        <div>
            <div className="container-fluid">
            {/* <img src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" /> */}
            <div className="featured-product-container  mt-4">
            
                {/* list product here */}
                <div className="row">
                   {
                    products.map((product) => (
                         <div className="col-md-3">
                        <ProductPreview {...product} />
                        </div>
                        )) }

                </div>

                <div>
                    <Link to="/category/all" style={{ textAlign: 'right', display: 'black', textDecoration: "none" }}>
                        See More {">>"}
                    </Link>
                </div>
            </div>
            </div>
            {/* sale banner here */}
            <div className="sale__banner--container mt-4">
                <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" />
            </div>
            <div className="recent-products-container container mt-4">
                <h1>Categories</h1>
                <div className="row">
                    {categories.map((category) => (
                        <div className="col-md-4">
                            <Link to={`/category/${category.name.toLocaleLowerCase()}`}>

                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home;

