import React from "react";
import style from "./Login.css";
import { Link,useNavigate  } from "react-router-dom";

function Login(){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        navigate("/Home"); // Navigate to the Home page after form submission

     
    };

    return(

<>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in || Sign up from</title>
  {/* font awesome icons */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
  {/* css stylesheet */}
  <link rel="stylesheet" href="Login.css" />
  <div className="container" id="container">
    <div className="form-container sign-up-container">
      <form action="#">
        <div className="logo-container">
          <img src="Logo.png" alt="Virtual Sikshya Logo" />
          <p>Virtual Sikshya</p>
        </div>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
          <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
          <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
        </div>
        <span>or use your email for registration</span>
        <div className="infield">
          <input type="text" placeholder="Name" />
          <label />
        </div>
        <div className="infield">
          <input type="email" placeholder="Email" name="email" />
          <label />
        </div>
        <div className="infield">
          <input type="password" placeholder="Password" />
          <label />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
    <div className="form-container sign-in-container">
      <form action="#">
        <div className="logo-container">
          <img src="Logo.png" alt="Virtual Sikshya Logo" />
          <p>Virtual Sikshya</p>
        </div>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
          <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
          <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
        </div>
        <span>or use your account</span>
        <div className="infield">
          <input type="email" placeholder="Email" name="email" />
          <label />
        </div>
        <div className="infield">
          <input type="password" placeholder="Password" />
          <label />
        </div>
        <a href="#" className="forgot">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container" id="overlayCon">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button>Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Warm, Greeting!</h1>
          <p>Enter your personal details and start journey with Virtual Sikshya</p>
          <button>Sign Up</button>
        </div>
      </div>
      <button id="overlayBtn" />
    </div>
  </div>
  {/* js code */}
</>
 );
}
export default Login;