import React, {useState} from 'react';

import { Redirect } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword : ""
    })

    const [toHome, setToHome] = useState(false)
    const [toLogin, setToLogin] = useState(false)

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            localStorage.setItem("user", JSON.stringify(state));
            let storageProfileString = localStorage.getItem("user");
            console.log("String saved in LocalStorage", storageProfileString);
            let savedPerson = JSON.parse(storageProfileString);
             console.log("Person object:", savedPerson);
             console.log("Person's email:", savedPerson.email);
        } else {
            localStorage.setItem("message", "Please enter the same password!");
            console.log(localStorage.getItem("message"));
        }

        setToLogin(true)
    }

    return(
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <h1>Register Here</h1>
      
      <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
          >
                    Register
                </button>            
            </form>
            { toHome && <Redirect to="/" /> }  
            { toLogin && <Redirect to="/login" /> }    
      </div>
    );
    };   

    export default RegistrationForm;
