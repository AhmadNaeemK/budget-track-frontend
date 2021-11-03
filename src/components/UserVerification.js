import React from 'react'
import API from '../API'
import { Link } from 'react-router-dom';


class UserVerification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            verified: null,
        }
    }

    componentDidMount = async () => {
        const query_params = new URLSearchParams(this.props.location.search)
        const token = query_params.get('token')
        const verificationResult = await API.verifyUserEmail(token)
        this.setState({
            verified: verificationResult.status === 200,
        })
    }

    render() {

        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    {this.state.verified ?
                        <>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <p> Account Verified click here to continue on BudgetTracker </p>
                                    <Link to='/'> <button type='button' className='btn primaryBtn'>Continue</button> </Link>
                                </div>
                            </div>
                        </> :
                        <>
                            <p> Account verification link expired please try again at the new link we have emailed you.</p>
                        </>
                    }
                </div>
            </div >
        )
    }
}


export default UserVerification;