import React, { useState } from "react";
import { useCreate } from "../Utilities/Authentication";
import { Link } from "react-router-dom";
import "../Styles/Desktop/Login.css";

function SignUpPage() {
    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        password: "" 
    });

    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [passwordMatchError, setPasswordMatchError] = useState(""); 
    const [validationErrors, setValidationErrors] = useState([]); 
    const [showPass, setShowPass] = useState(false); 

    const { signUp } = useCreate();

    const handleShowPass = () => setShowPass(!showPass);

    const handleChanges = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    
    const validatePassword = () => {
        const errorsList = [];
        const { password } = userData; 

        if (password.length === 0) {
            errorsList.push("Password cannot be empty.");
        }
        if (password.length < 8) {
            errorsList.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            errorsList.push("Password must contain at least one uppercase letter.");
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errorsList.push("Password must contain at least one symbol.");
        }
        return errorsList;
    };

    
    const handleSignUp = (e) => {
        e.preventDefault(); 

        const errorMessages = validatePassword();

        if (errorMessages.length > 0) {
            setValidationErrors(errorMessages); 
            return; 
        }

        
        if (userData.password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match.");
            return; 
        }

        setPasswordMatchError(""); 
        setValidationErrors([]); // 

        signUp(userData);
    };

    return (
        <React.Fragment>
            <div className="Login">
                <form onSubmit={handleSignUp} className="login-content">
                    <div className="mail-field">
                        <label className="mail-label">FirstName</label>
                        <br />
                        <input
                            className="mail-input"
                            type="text"
                            autoComplete="off"
                            name="FirstName"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className="mail-field">
                        <label className="mail-label">LastName</label>
                        <br />
                        <input
                            className="mail-input"
                            type="text"
                            autoComplete="off"
                            name="LastName"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className="mail-field">
                        <label className="mail-label">Email</label>
                        <br />
                        <input
                            className="mail-input"
                            type="text"
                            autoComplete="off"
                            name="email"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className="pass-field">
                        <label className="pass-label">Password</label>
                        <br />
                        <input
                            className="pass-input"
                            type={showPass ? "text" : "password"}
                            autoComplete="off"
                            name="password"
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className="pass-field">
                        <label className="pass-label">Confirm Password</label>
                        <br />
                        <input
                            className="pass-input"
                            type={showPass ? "text" : "password"}
                            autoComplete="off"
                            value={confirmPassword} // Not in userData
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>

                    {/* Display password validation errors */}
                    {validationErrors.length > 0 && (
                        <ul style={{ color: "red", marginTop: "10px" }}>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}

                    {passwordMatchError && (
                        <span style={{ color: "red", marginTop: "10px" }}>
                            {passwordMatchError}
                        </span>
                    )}

                    <div className="show-pass-field">
                        <input
                            className="show-pass-check"
                            type="checkbox"
                            onChange={handleShowPass}
                        />
                        <label className="show-pass-label">Show password</label>
                    </div>
                    <div className="submitting-field">
                        <button className="login-btn" type="submit">
                            SignUp
                        </button>
                        <label className="not-registered">
                            Registered? <Link to="/api/auth/login">Login</Link>
                        </label>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default SignUpPage;
