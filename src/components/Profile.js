import React from 'react'

import ModalComponent from './Modals';
import EditProfilePicForm from './User/EditProfilePicForm';

class UserProfile extends React.Component {

    render() {
        return (
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
                                        <img className='profile-display-pic' src={this.props.user.display_picture} alt='display_pic' /> :
                                        <i className='fa fa-user-circle-o fa-2x' style = {{fontSize: '140px'}} />
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
                    <div className='row'>
                    </div>
                    <hr/>
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
            </div >
        )
    }
}

export default UserProfile;