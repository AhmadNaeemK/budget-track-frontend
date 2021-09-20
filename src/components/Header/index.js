import React from 'react'

import { Wrapper, Content } from './Header.styles'

import Logout from '../Logout';
import UserDropDown from './userDropDown'
import { Link } from 'react-router-dom';

class Header extends React.Component {

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
            <nav>
                    <Wrapper>
                        <Content>
                            <Link style={{textDecoration: 'none', color: 'white'}} to={this.state.loggedIn ? '/home' : '/'}> <h1>Budget Track</h1> </Link>
                            {!this.state.loggedIn ?
                                null :
                                (
                                <>
                                <Logout
                                    loggedOut={this.loggedOut}
                                />
                                <UserDropDown />
                                </>
                                )
                            }
                        </Content>
                    </Wrapper >
            </nav>
        )
    }

}

export default Header