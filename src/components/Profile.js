import React from 'react'

import ModalComponent from './Modals';
import EditProfilePicForm from './User/EditProfilePicForm';
import ResetPasswordForm from './User/ResetPasswordForm';

class UserProfile extends React.Component {

    render() {
        return (this.props.user &&
            <div className='container'>
                <div className='container profile-card '>
                    <div className='row'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='p-4'>
                                <h1>{this.props.user.username}</h1>
                            </div>
                            <div className='p-4 profile-display-pic-container'>
                                {
                                    this.props.user.display_picture ?
                                        <img className='profile-display-pic' src={this.props.user.display_picture} alt='display_pic'/> :
                                        <i className='fa fa-user-circle-o fa-2x' style={{ fontSize: '140px' }} />
                                }
                                <button
                                    type='button'
                                    className='profile-display-pic edit-btn'
                                    data-bs-toggle='modal'
                                    data-bs-target='#update-pic'
                                >
                                    <i className='fa fa-edit'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='p-4 m-0'>
                            <p>Reset Password</p>
                        </div>
                        <div className='p-4'>
                            <button
                                type='button'
                                className='btn primaryBtn'
                                data-bs-toggle='modal'
                                data-bs-target='#reset-password'
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
                <ModalComponent
                    id='update-pic'
                    title='Upload Profile Pic'
                    modalBody={
                        <EditProfilePicForm
                            updateUser={this.props.updateUser}
                        />
                    }
                />
                <ModalComponent
                    id='reset-password'
                    title='Reset Password'
                    modalBody={
                        <ResetPasswordForm />
                    }
                />
            </div >
        )
    }
}

export default UserProfile;