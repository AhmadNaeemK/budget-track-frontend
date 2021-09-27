import React from 'react'

import { Link } from 'react-router-dom';
import Logout from '../Logout';

class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    static getDerivedStateFromProps(state, props) {
        const newState = {
            loggedIn: localStorage.getItem('username') ? true : false,
        }
        return newState
    }

    loggedOut = () => {
        this.setState({
            loggedIn: false
        })
    }

    render() {
        return (
            <nav className='navbar navbar-dark bg-dark'>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={this.state.loggedIn ? '/home' : '/'}> <h1>Budget Track</h1> </Link>
                {!this.state.loggedIn ?
                    null :
                    (
                        <>
                            <div className='row align-items-center m-2'>
                                <div className='col pt-2'>
                                    <p>{localStorage.getItem('username')}</p>
                                </div>
                                <div className='col'>
                                    <div className='dropdown'>
                                        <i className='fas fa-user-circle fa-3x' type='button' data-toggle='dropdown'></i>
                                        <div className="dropdown-menu" style={{right: '0', left:'auto'}} aria-labelledby="dropdownMenuButton">
                                        <Link style={{ textDecoration: 'none'}} to={'/friends'}> <p className="dropdown-item">Friends</p> </Link>
                                            <div className='dropdown-item'>
                                            <Logout 
                                                loggedOut={this.loggedOut}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </nav>
        )
    }
}

export default NavBar;