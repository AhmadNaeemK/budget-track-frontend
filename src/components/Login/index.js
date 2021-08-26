import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { LOGIN_URL } from '../../Config';


const LoginForm = () => {

    const navigate = useNavigate();
    
    const initialData = {
        username: '',
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialData);

    const handleSubmit = (event)=>{
        event.preventDefault();
        fetch(LOGIN_URL, {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify(formData),
        }).then(res => res.json())
        .then(result => {
            if (result.access){
                localStorage.setItem('access',result.access);
                localStorage.setItem('refresh', result.refresh);
                console.log(result);
                navigate('/home');
                }
            }
        )
        .catch (error => {
            console.log(error)
        });

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
        <input type="email" className="form-control" placeholder="Enter Email" name='email' onChange={handleChange}/>
    </div>

    <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleChange}/>
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