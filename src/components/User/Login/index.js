import React from 'react'
import { Redirect } from 'react-router-dom'

import API from '../../../API';

//redux
import { connect } from 'react-redux'

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
            const isNewUser = await checkNewUser()
            //state update
            this.setState({
                isNewUser: isNewUser,
            })
            this.props.handleLogin(result.user.id)
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

    render() {
        if (this.props.isLoggedIn && this.state.isNewUser) {
            return <Redirect to='/onboarding' />
        } else if (this.props.isLoggedIn && !this.state.isNewUser) {
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

                    <button type="submit" className="btn primaryBtn btn-block" onClick={this.handleSubmit}>Login</button>
                </form>
            )
        }
    }
}


function createLoginAction(user){
    return {
        type: 'user/login',
        payload: user
    }
}

function mapStateToProps (state) {
    return ({
      isLoggedIn: state.user.isLoggedIn
    })
  }

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLogin: (userId) => {
        API.fetchUser(userId).then(
            user => {
                dispatch(createLoginAction(user))
            }
        )
    } 
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);