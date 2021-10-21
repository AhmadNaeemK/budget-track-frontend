import React from 'react';
import { Link } from 'react-router-dom';

import { LOGOUT_URL } from '../../../Config';

class Logout extends React.Component {

    handleLogout = () => {
        console.log('logged out');
        fetch(
            LOGOUT_URL, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
            user: {
                username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')
            },
        });
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.props.loggedOut();
    }

    render() {
        return (
            <Link to='/'>
                <button className='btn primaryBtn' onClick={this.handleLogout}> Logout</button>
            </Link>
        )
    }
}

export default Logout