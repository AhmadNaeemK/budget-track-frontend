import React from 'react';
import API from '../../API';

class EditProfilePicForm extends React.Component {

    constructor(props){
        super(props);
        this.initial_state = {
            display_picture: null
        };
        this.state = this.initial_state;
    }

    handleFileChange = (event) => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('display_picture', this.state.display_picture, this.state.display_picture.name)
        const res = await API.updateUserDisplayPicture(formData)
        if (res.status === 202){
            const user = await API.fetchUser(localStorage.getItem('userid'))
            this.props.updateUser(user)
            this.state = this.initial_state
        }
    }

    render() {
        return (
            <form>
                <div className='mb-3'>
                    <label>Upload Picture</label>
                    <input type='file' className='form-control' name='display_picture' value={this.display_picture} onChange={this.handleFileChange}/>
                </div>
                <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit} >Upload</button>
            </form>
        )
    }
}

export default EditProfilePicForm