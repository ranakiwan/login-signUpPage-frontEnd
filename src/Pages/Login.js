import React, {useState } from "react"
import { useLogin } from "../Utilities/Authentication";
import { Link } from "react-router-dom";
import "../Styles/Desktop/Login.css";

function LoginPage(){
    const [userData, setUserData] = useState({
        email:"",
        password:"",
    })

    const {login} = useLogin();

    const [showPass, setShowPass] = useState(false)

    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    const handleChanges = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })
    }
    const handleLogin = (e) =>{
        e.preventDefault();
        login(userData);
    }

    return (
        <React.Fragment>
                <div className="Login">
                
                <form onSubmit={handleLogin} className="login-content">
                                    <div className="mail-field">
                            <label className="mail-label"> Email</label >
                            <br/>
                                                            <input className="mail-input" type="text" autoComplete="off" name="email" onChange={handleChanges} required/>
                                </div>
                            <div className="pass-field">
                            <label className="pass-label">Password</label >
                            <br/>
                                                            <input className="pass-input" type={showPass?"text":"password"} autoComplete="off" name="password" onChange={handleChanges} required/>
                            </div>
                            <div className="show-pass-field">
                                <input className="show-pass-check" type="checkbox" onChange={handleShowPass}/>
                                <label className="show-pass-label">Show password</label>
                            </div>
                            <div className="submitting-field">
                                <button className="login-btn" type="submit">Login</button>
                                <label className="not-registered">Not registered? <Link to="/api/auth/createUser">Register</Link></label>
                            </div>
                    </form>
                </div>
        </React.Fragment>
    )
}

export default LoginPage;