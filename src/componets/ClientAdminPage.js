import React, { useEffect, useState } from "react"
import axios from "../axios";
import Loading from "./Loading";
function ClientAdminPage(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            });
    },[])

    console.log("users", users)
    if (loading){
        return(
            <>
            <Loading/>
            </>
        )
    }

    if(users?.length === 0) return <h2 className="py-2 text-center">No users yet</h2>

    return (
        <div>
         
         <div class="table-responsive">
                 <table class="table">

            <thead>
                <tr>
                    <th>Client Id</th>
                    <th>Client Name</th>
                    <th>Email</th>                         
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>(
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
      
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    )
}

export default ClientAdminPage;


