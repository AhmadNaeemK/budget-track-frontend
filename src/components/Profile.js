import React from 'react'
import { connect } from 'react-redux';

import ModalComponent from './Modals';
import EditFullNameForm from './User/EditFullNameForm';
import EditProfilePicForm from './User/EditProfilePicForm';
import ResetPasswordForm from './User/ResetPasswordForm';

class UserProfile extends React.Component {

    render() {
        return (
            <div className='container'>
                <div className='container profile-card '>
                    <div className='row'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column p-4'>
                                <h1>{this.props.user.username}</h1>
                                <p className='text-nowrap'>{`${this.props.user.first_name} ${this.props.user.last_name}`}</p>
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
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='p-4 m-0'>
                            <p>Change Display Name</p>
                        </div>
                        <div className='p-4'>
                            <button
                                type='button'
                                className='btn primaryBtn'
                                data-bs-toggle='modal'
                                data-bs-target='#change-display-name'
                            >
                                Change
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
                <ModalComponent
                    id='update-pic'
                    title='Upload Profile Pic'
                    modalBody={
                        <EditProfilePicForm/>
                    }
                />
                <ModalComponent
                    id='reset-password'
                    title='Reset Password'
                    modalBody={
                        <ResetPasswordForm />
                    }
                />
                <ModalComponent
                    id='change-display-name'
                    title='Change Name'
                    modalBody={
                        <EditFullNameForm />
                    }
                />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user_props
})

export default connect(mapStateToProps)(UserProfile);