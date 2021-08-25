import React from 'react'
import { useState } from 'react';

const LoginForm = () => {
    
    const initialData = {
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState({initialData})

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(formData)
    }

    const handleChange = (event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    
    
    return(
    <form>
    <h3>Sign In</h3>

    <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Enter " onChange={handleChange}/>
    </div>

    <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange}/>
    </div>

    <div className="form-group">
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        </div>
    </div>

    <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
    <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
    </p>
    </form>

)};

export default LoginForm;