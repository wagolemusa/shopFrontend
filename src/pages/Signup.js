import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import './signup.css'
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import log from './log.png'
import pto from './pto.avif'


const Signup = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ signup, { error, isLoading, isError} ] = useSignupMutation();

    function handleSignup(e){
        e.preventDefault();
        signup({ name, email, password });
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <div className="login-box1">
                    <div className="row">
                        <div className="col">
                            <h1>Signup </h1>
                        </div>
                        <div className="col">
                            <img src={log} alt='log'/>
                        </div>
                    </div><br/>
                   
                    <form style={{ width: "100%" }} onSubmit={handleSignup}>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <div class="mb-3">
                    <input type="text" id="form12" class="form-control" placeholder="Full Names" required
                        value={name}  onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div class="mb-3">
                    <input type="text" id="form12" class="form-control" placeholder="Email" required
                        value={email}  onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div class="mb-3">
                    <input type="password" id="form12" class="form-control" placeholder="Password" required
                        value={password}  onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button type="submit" class="btn-login" disabled={isLoading}>Signup</button>
                    <p className="pt-3 text-center">
                        Don't have an account? <Link to="/login">Login</Link>{" "}
                    </p>
                    </form>
                    </div>
                    </div>
                    <div className="col-md-6">
                        <div className="signupImage">
                            <img src={pto} alt='log'/>

                        </div>
  
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;


