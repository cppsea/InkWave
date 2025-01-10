import './SignUp.css';

const SignUp = () => {
    return (  
        <div className="sign-up-page">
            <button className="sign-up-page--back-button">{"< Back"}</button>
            <div className="sign-up-page__centered-container">
                <div className="sign-up-page__centered-container__title">Register</div>
                <div className="sign-up-page__centered-container__input-fields">
                <div className="sign-up-page_centered-container__input-fields__email-label">Email:</div>
                    <input className="sign-up-page__centered-container__input-fields__email-field"/>
                    <div className="sign-up-page__centered-container__input-fields__password-label">Password:</div>
                    <input className="sign-up-page__centered-container__input-fields__password-field"/>
                    <div className="sign-up-page__centered-container__input-fields__confirm-password-label">Confirm Password:</div>
                    <input className="sign-up-page__centered-container__input-fields__confirm-password-field"/>
                    <button className="sign-up-page__centered-container__input-fields__sign-up-button">Sign Up</button>                
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;