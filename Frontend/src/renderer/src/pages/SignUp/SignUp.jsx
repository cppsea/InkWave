import {Link, useNavigate} from 'react-router-dom';
import './SignUp.css';
import {useState} from 'react';

const SignUp = () => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    let isValidToRegister = true;
    // const [isValidToRegister, setIsValidToRegister] = useState(true);

    const navigate = useNavigate();

    const handleClickRegister = async () => {
        isValidToRegister = true;

        if (emailInput.length > 0) {
            setIsValidEmail(true);
        }
        else {
            setIsValidEmail(false);
            isValidToRegister = false;
        }

        if (passwordInput.length > 5) {
            setIsValidPassword(true);
        }
        else {
            setIsValidPassword(false);
            isValidToRegister = false;
        }

        if (passwordInput === confirmPasswordInput) {
            setIsValidConfirmPassword(true);
        }
        else {
            setIsValidConfirmPassword(false);
            isValidToRegister = false;
        }

        if (isValidToRegister) {
            const userInformation = {
                email: emailInput,
                password: passwordInput
            }

            const data = await fetch("http://localhost:1400/api/auth/register", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userInformation)
            }).then(async (response) => {
                const result = await response.json();
                // console.log("id: ", result.user._id);
                if (result.user._id !== undefined) {
                    navigate("/login");
                }
            })
        }
    }

    const handleChangeEmailInput = (event) => {
        setEmailInput(event.target.value);
    }

    const handleChangePasswordInput = (event) => {
        setPasswordInput(event.target.value);
    }

    const handleChangeConfirmPasswordInput = (event) => {
        setConfirmPasswordInput(event.target.value);
    }

    return (  
        <div className="sign-up-page">
            <Link to="/login">
                <button className="sign-up-page--back-button">{"< Back"}</button>
            </Link>
            <div className="sign-up-page__centered-container">
                <div className="sign-up-page__centered-container__title">Register</div>
                <div className="sign-up-page__centered-container__input-fields">
                <div className="sign-up-page_centered-container__input-fields__email-label">Email:</div>
                    <input 
                        className="sign-up-page__centered-container__input-fields__email-field" 
                        value={emailInput} 
                        onChange={handleChangeEmailInput}
                    />
                    {(!isValidEmail) && (
                        <div className="sign-up-page__centered-container__input-fields__email-error">Must be a valid email</div>
                    )}
                    <div className="sign-up-page__centered-container__input-fields__password-label">Password:</div>
                    <input 
                        className="sign-up-page__centered-container__input-fields__password-field"
                        type="password"
                        value={passwordInput}
                        onChange={handleChangePasswordInput}
                    />
                    {(!isValidPassword) && (
                        <div className="sign-up-page__centered-container__input-fields__password-error">Password must be at least 6 characters long</div>
                    )}
                    <div className="sign-up-page__centered-container__input-fields__confirm-password-label">Confirm Password:</div>
                    <input 
                        className="sign-up-page__centered-container__input-fields__confirm-password-field"
                        type="password"
                        value={confirmPasswordInput}
                        onChange={handleChangeConfirmPasswordInput}
                    />
                    {(!isValidConfirmPassword) && (
                        <div className="sign-up-page__centered-container__input-fields__confirm-password-error">Must enter the same password</div>
                    )}
                    <button 
                        className="sign-up-page__centered-container__input-fields__sign-up-button"
                        onClick={handleClickRegister}
                    >
                        Sign Up
                    </button>                
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;