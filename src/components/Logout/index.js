import React from 'react';

import { useNavigate } from 'react-router';

import { LOGOUT_URL } from '../../Config';

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout= () => {
            console.log('logged out');
            fetch (
                LOGOUT_URL,{
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access'), 
                    },
                    user: {username: localStorage.getItem('username'),
                        userid: localStorage.getItem('userid')},
                });
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            navigate('/');
        }

    return <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    
}

export default Logout