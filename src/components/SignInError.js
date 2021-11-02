import React from 'react'
import API from '../API';

class SignInError extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            email: null
        }
        this.state = this.initialState
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.email)
        const res = await API.regenVerificationLink(this.state.email);
        if (res.status === 200){
            this.state = this.initialState
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5'>
                        <p> Enter your email and we will send you a verification link if and account with that email exists in our system </p>
                        <form>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" name='email' value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <button type='submit' onClick={this.handleSubmit} className='btn primaryBtn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInError;