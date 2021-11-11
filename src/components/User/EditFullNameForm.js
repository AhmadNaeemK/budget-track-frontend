import React from 'react'
import { connect } from 'react-redux';
import API from '../../API';

class EditFullNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.initial_state = {
            'first_name': props.user.first_name,
            'last_name': props.user.last_name
        }
        this.state = this.initial_state
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        API.updateFullName(this.state).then(user => {
            this.props.updateUser(user)
        })
    }

    render() {
        return (
            <form>

                <div className='mb-3'>
                    <label htmlFor='first_name'>First Name</label>
                    <input
                        type='text'
                        name='first_name'
                        className='form-control'
                        placeholder='First Name'
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='last_name'>Last Name</label>
                    <input
                        name='last_name'
                        type='text'
                        className='form-control'
                        placeholder='Last Name'
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                </div>

                <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit}>
                    Change
                </button>

            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user_props
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => {
            dispatch({
                type: 'user/update',
                payload: user
            })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFullNameForm);
