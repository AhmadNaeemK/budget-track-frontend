import React from 'react'

import FriendsRequestList from './FriendsRequestList'
import UserList from './UserList'

import API from '../API'



class FriendsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            friendRequestsSent: [],
            friendRequestsReceived: []
        }
    }

    sentRequestHandler = async () => {
        const friendRequestsSent = await API.fetchSentFriendRequestList();
        this.setState({
            friendRequestsSent: friendRequestsSent,
        })
    }

    receivedRequestHandler = async () => {
        const friendRequestsReceived = await API.fetchReceivedFriendRequestList();

        this.setState({
            friendRequestsReceived: friendRequestsReceived
        })
    }

    componentDidMount() {
        (async () => {
            const friendRequestsSent = await API.fetchSentFriendRequestList();
            const friendRequestsReceived = await API.fetchReceivedFriendRequestList();

            this.setState({
                friendRequestsSent: friendRequestsSent,
                friendRequestsReceived: friendRequestsReceived
            })
        })().then(() => { this.setState({ isLoaded: true }) });
    }

    render() {
        return (
            <div>
                {this.state.isLoaded &&
                    <>
                        <div className='row m-2'>
                            <div className='col-5 border rounded border-white p-2 m-2'>
                                <h4>Sent Requests</h4>
                                <FriendsRequestList
                                    requests={this.state.friendRequestsSent}
                                    requestType='sent'
                                    requestHandler={this.sentRequestHandler}
                                />
                            </div>
                            <div className='col-5 border rounded border-white p-2 m-2'>
                                <h4>Received Requests</h4>
                                <FriendsRequestList
                                    requests={this.state.friendRequestsReceived}
                                    requestType={'received'}
                                    requestHandler={this.receivedRequestHandler}
                                />
                            </div>
                        </div>

                        <div className='row m-2'>
                            <div className='col-5 border rounded border-white p-2 m-2' style={{minWidth: '800px'}}>
                                <UserList userType='Users' requestHandler={this.sentRequestHandler} title="Users"/>
                            </div>
                            <div className='col-5 border rounded border-white p-2 m-2' style={{minWidth: '800px'}}>
                                <UserList userType='Friends' title="Friends"/>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default FriendsPage