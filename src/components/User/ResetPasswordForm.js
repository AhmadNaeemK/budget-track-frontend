import React from 'react'

import API from '../../API';

class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            formFields: {
                password: '',
                confirmPassword: ''
            },
            formErrors: {
                password: '',
                confirmPassword: ''
            }
        };
        this.state = this.initialState;
    }

    handleChange = (event) => {
        this.setState({
            formFields: {
                ...this.state.formFields,
                [event.target.name]: event.target.value
            }
        });
    }

    isValidForm = () => {
        let validForm = false

        // 1 digit 1 small charachter 1 capital charachter 1 special charachter no special charachter minimum 8 charachters
        // Example: "Pa&sw0rd12"
        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W])(?!.*[\s]).{8,}$/

        const validationFormErrors = { ...this.initialState.formErrors }
        if (this.state.formFields.password !== this.state.formFields.confirmPassword) {
            validationFormErrors.password = 'Password and Confirm Password does not match';
            validationFormErrors.confirmPassword = 'Password and Confirm Password does not match';
        } else if (!validPasswordRegex.test(this.state.formFields.password)) {
            validationFormErrors.password = 'Invalid password, enter a valid password with atleast 1 capital letter, 1 digit and 1 special character'
        } else {
            validForm = true
        }
        this.setState({
            formErrors: validationFormErrors
        })
        return validForm
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.isValidForm()) {
            const res = await API.updatePassword(this.state.formFields)
            if (res.status === 200) {
                this.setState(
                    this.initialState
                );
                this.props.handlePasswordReset()
            }
        }
    }

    render() {
        return (
            <form>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.formFields.password} placeholder="Password" name='password' onChange={this.handleChange} />
                    <span className="invalid-form-entry">{this.state.formErrors.password}</span>
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={this.state.formFields.confirmPassword} placeholder="Confirm Password" name='confirmPassword' onChange={this.handleChange} />
                    <span className="invalid-form-entry">{this.state.formErrors.confirmPassword}</span>
                </div>
                <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit}>Reset</button>
            </form>
        )
    }
}

export default ResetPasswordForm;