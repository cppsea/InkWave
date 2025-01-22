import {Link} from "react-router-dom";
import "./Login.css";

const Login = () => {
    return (  
        <div className="login-page">
            <div className="login-page__centered-container">
                <div className="login-page__centered-container__title">Sign in</div>
                <div className="login-page__centered-container__input-fields">
                    <div className="login-page_centered-container__input-fields__email-label">Email:</div>
                    <input className="login-page__centered-container__input-fields__email-field"/>
                    <div className="login-page__centered-container__input-fields__password-label">Password:</div>
                    <input 
                        className="login-page__centered-container__input-fields__password-field"
                        type="password"
                    />
                    <button className="login-page__centered-container__input-fields__login-button">Login</button>
                </div>
            </div>
            <Link to="/register">
                <button className="login-page__register-button">Create an Account</button>
            </Link>
        </div>
    );
}
 
export default Login;