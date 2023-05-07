import React, {useEffect, useState} from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

function Categories(){
    const [category, setCategory] = useState([]);
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        
        setLoading(true);
        axios
            .get('/products/category')
            .then(({ data }) => {
                setLoading(false);
                setCategory(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, []);

    console.log('category', category)
    return(
        <>
                <div className="row">
                    {category.map((categ) => (
                        <div className="col-md-3 cata">
                            <Link to={`/category/${categ.category}`}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 2, 0.4)), url(${categ.pictures[0].url})`, gap: "10px" }} className="category-tile">
                                    <p>{categ.category}</p>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>
        </>
    )
}

export default Categories





// const categories = [
//     {
//         name: "Technology",
//         img: "https://images.unsplash.com/photo-1518997554305-5eea2f04e384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//     },
//     {
//         name: "Phone",
//         img: "https://images.unsplash.com/photo-1464380573004-8ca85a08751a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvbmV8ZW58MHx8MHx3aGl0ZXw%3D&auto=format&fit=crop&w=800&q=60",
//     },

//     { name: "Tablet", img: "https://images.unsplash.com/photo-1575909812264-6902b55846ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
// ];

// export default categories;