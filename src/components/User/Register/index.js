import React from 'react'
import { useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../../../API';


const RegistrationForm = () => {

    const initialData = {
        username: '',
        email: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialData)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await API.register(formData);
        if (res.status === 200){
            window.location.href = '/'
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='container-fluid p-2'>
            <div className='d-flex justify-content-center mt-5'>
                <div className='col-5'>
                    <form>
                        <h3>Sign Up</h3>

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

                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
                    </form>

                    <div>
                        <Link to='/'> Already Have an Account? </Link>
                    </div>
                </div> 
            </div> 
        </div>
    )
};

export default RegistrationForm;