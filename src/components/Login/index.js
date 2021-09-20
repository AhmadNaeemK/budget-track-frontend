import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import API from '../../API';

async function checkNewUser(){
    const accounts = await API.fetchCashAccountList()
    const transactions = await API.fetchExpenseList(new Date().getMonth() + 1)

    if (accounts[0].balance === 0 && transactions.length === 0){
        return true
    }
    return false
}

const LoginForm = () => {

    const navigate = useNavigate();

    const initialData = {
        username: '',
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await API.login(formData);
        if (result.access) {
            localStorage.setItem('access', result.access);
            localStorage.setItem('refresh', result.refresh);
            localStorage.setItem('username', result.user);
            localStorage.setItem('userid', result.id);
            const isNewUser = await checkNewUser()
            if (!isNewUser){
                window.location.href = '/home';
            } else {
                window.location.href = '/onboarding'
            }
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
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter Email" name='email' onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleChange} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
        </form>

    )
};

export default LoginForm;