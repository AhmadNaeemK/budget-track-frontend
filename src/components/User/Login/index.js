import React from 'react'
import { Link } from 'react-router-dom'

import API from '../../../API';

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
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const result = await API.login(this.state);
        if (result.access) {
            this.props.handleLogin(true)
            localStorage.setItem('access', result.access);
            localStorage.setItem('refresh', result.refresh);
            localStorage.setItem('username', result.user);
            localStorage.setItem('userid', result.id);
            const isNewUser = await checkNewUser()
            if (!isNewUser) {
                window.location.href = '/home';
            } else {
                window.location.href = '/onboarding'
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        if (localStorage.getItem('access')){
            window.location.href = '/home'
        }
    }

    render() {
        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5'>
                        <form>
                            <h3>Sign In</h3>

                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" name='email' onChange={this.handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={this.handleChange} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                        </form>

                        <div>
                            <Link to='/signup'> Create Your Account </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default LoginForm;