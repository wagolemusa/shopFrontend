import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [login, {isError, isLoading, error }] = useLoginMutation()

    function handleLogin(e){
        e.preventDefault();
        login({ email, password})

    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Login into account</h1>
                    <form style={{ width: "100%" }} onSubmit={handleLogin}>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                    <div class="form-outline">
                    <input type="text" id="form12" class="form-control" placeholder="Email" required
                        value={email}  onChange={(e) => setEmail(e.target.value)}
                    />
                    </div><br/>
                    <div class="form-outline">
                    <input type="text" id="form12" class="form-control" placeholder="Password" required
                        value={password}  onChange={(e) => setPassword(e.target.value)}
                    />
                    </div><br/>
                    <button type="submit" class="btn btn-primary" disabled={isLoading}>Login</button>
                    <p className="pt-3 text-center">
                            Don't have an account? <Link to="/signup">Create account</Link>{" "}
                        </p>
                    </form>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="login__image_conatiner">
                            
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;


