import React from 'react'

import { Link } from 'react-router-dom';
import Logout from '../User/Logout'

class NavBar extends React.Component {


    loggedOut = () => {
        this.props.handleLogout(false)
    }

    render() {
        return (
            <nav className='navbar navbar-dark bg-dark'>
                {!this.props.loggedIn ?
                    (<div className='container-fluid mt-2'>
                        <h1>Budget Tracker</h1>
                    </div>)
                    :
                    (
                        <div className='container-fluid mt-2'>
                            <div></div>
                            <div className='row align-items-center m-2'>
                                <div className='col pt-2'>
                                    <p>{localStorage.getItem('username')}</p>
                                </div>
                                <div className='col'>
                                    <div className='dropdown'>
                                        <i className='fas fa-user-circle fa-3x' type='button' data-bs-toggle='dropdown'></i>
                                        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                            <li>
                                                <Link style={{ textDecoration: 'none' }} to={'/friendRequests'}> <p className="dropdown-item">Friend Requests</p> </Link> 
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link style={{ textDecoration: 'none' }} to={'/friends'}> <p className="dropdown-item">Friends</p> </Link> </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <div className='dropdown-item'>
                                                    <Logout
                                                        loggedOut={this.loggedOut}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </nav>
        )
    }
}

export default NavBar;