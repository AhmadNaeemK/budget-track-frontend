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
                            <Logout
                                loggedOut={this.loggedOut}
                            />
                        </>
                    )
                }
            </nav>
        )
    }
}

export default NavBar;