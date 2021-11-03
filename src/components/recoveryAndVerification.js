import React from 'react'
import API from '../API';

class RecoveryVerificationPage extends React.Component {

    initialState = {
        formFields: {
            email: ''
        },
        formErrors: {
            email: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValidForm = this.handleValidation();
        if (isValidForm) {
            if (this.props.passwordRecovery) {
                API.generatePasswordRecoveryLink(this.state.formFields.email).then((res) => {
                    if (res.status === 200){
                        this.setState(this.initialState);
                    }
                })
            } else {
                API.regenVerificationLink(this.state.formFields.email).then((res) => {
                    if (res.status === 200) {
                        this.setState(this.initialState);
                    }
                })
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            formFields: {
                [event.target.name]: event.target.value
            }
        });
    }

    handleValidation = () => {
        const emailRegex = /\S+@\S+\.\S+/
        let isValidForm = true
        const formErrors = { ...this.initialState.formErrors }
        if (!emailRegex.test(this.state.formFields.email)) {
            formErrors["email"] = "Invalid Email";
            isValidForm = false
        }
        this.setState({
            formErrors: { ...formErrors }
        })
        return isValidForm
    }

    render() {
        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5'>
                        {this.props.passwordRecovery ?
                            <p> Enter your email and we will send you a password recover link there if that account exists. </p>
                            :
                            <p> Enter your email and we will send you a verification link if an account with that email exists in our system </p>
                        }
                        <form>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value={this.state.formFields.email} placeholder="Enter Email" name='email' onChange={this.handleChange} />
                                <span className="invalid-form-entry">{this.state.formErrors.email}</span>
                            </div>
                            <button type='submit' onClick={this.handleSubmit} className='btn primaryBtn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecoveryVerificationPage;