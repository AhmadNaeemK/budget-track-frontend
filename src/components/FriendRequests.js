import React from 'react'

import ReceivedRequests from './FriendsRequestList/receivedRequests'
import SentRequests from './FriendsRequestList/sentRequests'

class AllFriendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedList: 'received'
        }
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
                            <div className="form-check form-check-inline">
                                <input className="btn-check" type="radio" name="received" id="received"
                                    value="received" checked={this.state.selectedList === 'received'} />
                                <label className="btn btn-outline-secondary" htmlFor="received">Received</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="btn-check" type="radio" name="sent" id="sent" value="sent"
                                    checked={this.state.selectedList === 'sent'}
                                />
                                <label className="btn btn-outline-secondary" htmlFor="sent">Sent</label>
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