import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import './Home.css'
// import { updateProducts } from "../features/productSlice";
import ProductPreview from '../componets/ProductPreview'
import Categories from "../Categories";
import gas1 from './gas1.jpeg'
import Contant from "../componets/Contant";
import Footer from "../componets/Footer";

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
            <div className="container">
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
                  
                </div>
            </div>
            </div>

            {/* sale banner here */}
            <div className="sale__banner--container mt-4">

                <img src={gas1} alt="image"></img>

            </div>
            
            <div className="recent-products-container container mt-4">
                
                <Categories />
            </div>
            <Contant/>

          
                <Footer />
           
        </div>
    )
}
export default Home;

