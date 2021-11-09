import React from 'react'
import { useState } from 'react';

import API from '../../../API';


const RegistrationForm = (props) => {

    const initialData = {
        username: '',
        email: '',
        password: '',
        phone_number: '',
    }

    const [formData, setFormData] = useState(initialData)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await API.register(formData);
        if (res.status === 200) {
            props.changeSelectedForm('login')
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form>
            <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control" name='username'
                    placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>


            <div className="mb-3">
                <label>Email address</label>
                <input type="email" className="form-control" name='email'
                    placeholder="Enter email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" name='password'
                    placeholder="Enter password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                    className="form-control"
                    type="tel"
                    name="phone_number"
                    onChange={handleChange}
                    placeholder="+xxxxxxxxxxxx"
                    value={formData.phone_number}
                    required
                />
            </div>

            <button type="submit" className="btn primaryBtn btn-block" onClick={handleSubmit}>Sign Up</button>
        </form>
    )
};

export default RegistrationForm;