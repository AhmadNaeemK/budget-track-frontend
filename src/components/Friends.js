import React from 'react'

import FriendsList from './User/UserList/FriendsList'
import UsersList from './User/UserList/UserList';



class FriendsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedList: 'friends'
        }
    }

    handleListSelect = (event) => {
        this.setState({
            selectedList: event.target.value
        })
    }

    render() {
        return (
            <div className='container mt-3'>
                <div className='d-flex justify-content-between'>
                    <h2>Friends</h2>
                    <div className='form-check' onChange={event => this.setState({
                        selectedList: event.target.value
                    })}>
                        <div className="form-check form-check-inline">
                            <input className="btn-check" type="radio" name="friends" id="friends"
                                value="friends" checked={this.state.selectedList === 'friends'} />
                            <label className="btn btn-outline-secondary" htmlFor="friends">Friends</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="btn-check" type="radio" name="users" id="users" value="users"
                                checked={this.state.selectedList === 'users'}
                            />
                            <label className="btn btn-outline-secondary" htmlFor="users">Add Friends</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {this.state.selectedList === 'friends' ?
                            <FriendsList /> :
                            <UsersList />
                        }
                    </div>
                </div>
            </div >

        )
    }
}

export default FriendsPage