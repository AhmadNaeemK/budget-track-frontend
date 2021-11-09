import React from 'react'
import { Redirect } from 'react-router-dom'

import API from '../../../API';
import { API_URL } from '../../../Config';

async function checkNewUser() {
    const accounts = await API.fetchCashAccountList()
    const transactions = await API.fetchExpenseList(new Date().getMonth() + 1)

    if (parseInt(accounts.results[0].balance) === 0 && parseInt(transactions.count) === 0) {
        return true
    }
    return false
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
            isNewUser: null,
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const result = await API.login(this.state);
        if (result.access) {
            localStorage.setItem('access', result.access);
            localStorage.setItem('refresh', result.refresh);
            localStorage.setItem('username', result.user.username);
            localStorage.setItem('userid', result.user.id);
            if (result.user.display_picture) {
                result.user.display_picture = API_URL + result.user.display_picture
            }
            this.props.handleLogin(true, result.user)
            const isNewUser = await checkNewUser()
            //state update
            this.setState({
                isLoggedIn: true,
                isNewUser: isNewUser,
            })
        } else {
            const error = result.detail
            alert(error)
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        if (localStorage.getItem('access')) {
            this.setState({
                isLoggedIn: true
            })
        }
    }

    render() {
        if (this.state.isLoggedIn && this.state.isNewUser) {
            return <Redirect to='/onboarding' />
        } else if (this.state.isLoggedIn && !this.state.isNewUser) {
            return <Redirect to='/home' />
        } else {
            return (
                <form>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter Email" name='email' onChange={this.handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={this.handleChange} />
                    </div>

                    <button type="submit" className="btn primaryBtn btn-block" onClick={this.handleSubmit}>Submit</button>
                </form>
            )
        }
    }

}

export default LoginForm;