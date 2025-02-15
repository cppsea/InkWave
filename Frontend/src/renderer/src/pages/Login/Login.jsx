import {Link, useNavigate} from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";

const Login = ({userID, setUserID}) => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userID", userID)
    }, [])

    const handleClickLogin = async () => {
        const userInformation = {
            email: emailInput,
            password: passwordInput
        }

        const data = await fetch("http://localhost:1400/api/auth/login", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userInformation)
        }).then(async (response) => {
            const result = await response.json();
            console.log("result: ", result);
            console.log("id: ", result._id);
            if (result._id !== undefined) {
                setUserID(result._id);
                navigate("/");
            }
        })
    }

    const handleChangeEmailInput = (event) => {
        setEmailInput(event.target.value);
    }

    const handleChangePasswordInput = (event) => {
        setPasswordInput(event.target.value);
    }

    return (  
        <div className="login-page">
            <div className="login-page__centered-container">
                <div className="login-page__centered-container__title">Sign in</div>
                <div className="login-page__centered-container__input-fields">
                    <div className="login-page_centered-container__input-fields__email-label">Email:</div>
                    <input 
                        className="login-page__centered-container__input-fields__email-field"
                        value={emailInput}
                        onChange={handleChangeEmailInput}
                    />
                    <div className="login-page__centered-container__input-fields__password-label">Password:</div>
                    <input 
                        className="login-page__centered-container__input-fields__password-field"
                        value={passwordInput}
                        onChange={handleChangePasswordInput}
                        type="password"
                    />
                    <button 
                        className="login-page__centered-container__input-fields__login-button"
                        onClick={handleClickLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
            <Link to="/register">
                <button className="login-page__register-button">Create an Account</button>
            </Link>
        </div>
    );
}
 
export default Login;