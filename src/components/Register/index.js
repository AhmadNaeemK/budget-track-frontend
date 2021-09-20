import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../API';


const RegistrationForm = () => {

    const initialData = {
        username: '',
        email: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialData)

    const handleSubmit = (event)=>{
        event.preventDefault();
        API.register(formData);
    }

    const handleChange = (event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
    <form>
        <h3>Sign Up</h3>

        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name='username' 
            placeholder="Username" value={formData.username} onChange={handleChange}/>
        </div>


        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" name='email' 
            placeholder="Enter email" value={formData.email} onChange={handleChange}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name='password' 
            placeholder="Enter password" value={formData.password} onChange={handleChange}/>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
    </form>
)};

export default RegistrationForm;