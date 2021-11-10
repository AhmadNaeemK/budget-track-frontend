import React from 'react'
import { Link } from 'react-router-dom';
import LoginForm from './User/Login';
import RegistrationForm from './User/Register';

class SignUpLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedForm: 'login',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeSelectedForm = (selection) => {
        this.setState({
            selectedForm: selection
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='container-fluid p-2'>
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='col-5'>
                            <div className='d-flex'>
                                <div className="btn-group w-100" role="group" onChange={this.handleChange}>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name='selectedForm'
                                        value='login' id="login"
                                        checked={this.state.selectedForm === 'login'}
                                        readOnly />
                                    <label className="btn btn-outline-secondary" htmlFor="login">Login</label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name='selectedForm'
                                        value='signup' id="signup"
                                        checked={this.state.selectedForm === 'signup'}
                                        readOnly />
                                    <label className="btn btn-outline-secondary" htmlFor="signup">SignUp</label>
                                </div>
                            </div>
                            <div className='mt-4'>
                                {this.state.selectedForm === 'login' ?
                                    <>
                                        <LoginForm/>
                                        <div className='d-flex justify-content-between'>
                                            <Link to='/forgotPassword'> Forgot Password </Link>
                                            <Link to='/signin-error'> Activate Account </Link>
                                        </div>
                                    </> :
                                    <RegistrationForm 
                                        changeSelectedForm={this.changeSelectedForm}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpLoginPage;
