import React from 'react'
import ResetPasswordForm from './User/ResetPasswordForm';

class PasswordRecoveryPage extends React.Component {

    constructor(props) {
        super(props);
        const query_params = new URLSearchParams(props.location.search);
        const token = query_params.get('token');
        localStorage.setItem('access', token);
    }

    handlePasswordReset= () => {
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }

    render() {
        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5'>
                        <ResetPasswordForm handlePasswordReset={this.handlePasswordReset}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default PasswordRecoveryPage;