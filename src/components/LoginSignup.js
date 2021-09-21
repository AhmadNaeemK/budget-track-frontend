import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './Login';
import RegistrationForm from './Register';
import RegisterationForm from './Register';


const Signup = () => {

    return (
        <div className='container-fluid p-2'>
            <div className='d-flex justify-content-center mt-5'>
                <div className='col-5'>
                    <Routes>
                        <Route path='/' element={<LoginForm/>} />
                        <Route path='/signup' element={<RegistrationForm/>} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default Signup;