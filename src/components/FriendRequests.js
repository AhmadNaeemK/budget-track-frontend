import React from 'react'

import API from '../API'
import ReceivedRequests from './FriendsRequestList/receivedRequests'
import SentRequests from './FriendsRequestList/sentRequests'
import FriendsList from './User/UserList/FriendsList'

class AllFriendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            friendRequestsSent: [],
            friendRequestsReceived: [],
            selectedList: 'received'
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
            <div className='d-flex m-2 justify-content-center'>
                <div className='border rounded border-white p-2 m-2' style={{ minWidth: '90%' }}>
                    <div className='d-flex justify-content-between m-4'>
                        <h2>Friend Requests</h2>
                        <div className='form-check' onChange={event => this.setState({
                            selectedList: event.target.value
                        })}>
                            <div class="form-check form-check-inline">
                                <input class="btn-check" type="radio" name="received" id="received"
                                    value="received" checked={this.state.selectedList === 'received'} />
                                <label class="btn btn-outline-secondary" htmlFor="received">Received</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="btn-check" type="radio" name="sent" id="sent" value="sent"
                                    checked={this.state.selectedList === 'sent'}
                                />
                                <label class="btn btn-outline-secondary" htmlFor="sent">Sent</label>
                            </div>
                        </div>
                    </div>
                    {this.state.selectedList === 'received' ?
                        <ReceivedRequests />
                        :
                        <SentRequests />
                    }
                </div>
            </div>
        )
    }
}

export default AllFriendRequest;