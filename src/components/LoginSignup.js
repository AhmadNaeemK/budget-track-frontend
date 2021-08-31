import React from 'react';

import LoginForm from './Login';
import RegisterationForm from './Register';


const LoginSignup = () => {

    return (
        <div className='container-fluid p-2'>
            <div className='d-flex justify-content-center mt-5'>
                <div className='col-5'>
                    <LoginForm />
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='col-5'>
                    <RegisterationForm />
                </div>
            </div>

        </div>
    )
}

export default LoginSignup;