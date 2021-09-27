import React from 'react'

import API from '../../API';

class FriendsRequestList extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDelete = async (event) => {
        const requestId = parseInt(event.target.id.split(/del-btn-/)[1]);
        const res = await API.deleteFriendRequest(requestId)
        if (res.status === 204) {
            this.props.requestHandler()
        } else {
            alert(res[Object.keys(res)[0]])
        }
    }

    handleAccept = async (event) => {
        const requestId = parseInt(event.target.id.split(/accept-btn-/)[1]);
        const res = await API.acceptFriendRequest(requestId)
        if (res.status === 201) {
            alert("Request Accepted")
            this.props.requestHandler();
        } else {
            alert(res[Object.keys(res)[0]])
        }
    }

    render() {
        return (
            <table className='table table-dark table-striped'>
                <tbody>
                    <tr>
                        <td>{this.props.requestType === 'sent' ? 'Receiver' : 'Sender'}</td>
                        <td>Date</td>
                        <td></td>
                    </tr>

                    {this.props.requests.length > 0 ?
                        this.props.requests.map(request => (
                            <tr key={request.id} id={request.id}>
                                <td>{this.props.requestType === 'sent' ? request.receiver : request.user}</td>
                                <td>{request.request_time.match(/\d{4,}-\d{2}-\d{2}/)}</td>
                                <td>
                                    <div className='row'>
                                    <div className='col-2'>
                                        <button id={`del-btn-${request.id}`} className='btn btn-outline-danger' onClick={this.handleDelete}>
                                            <i id={`del-btn-${request.id}`} className='fas fa-times'></i>
                                        </button>
                                    </div>

                                    {this.props.requestType === 'received' ?
                                        <div className='col-2'>
                                            <button id={`accept-btn-${request.id}`} className='btn btn-outline-success' onClick={this.handleAccept}>
                                                <i id={`accept-btn-${request.id}`} className='fas fa-check'></i>
                                            </button>
                                        </div>
                                        : null
                                    }
                                    </div>
                                </td>

                            </tr>
                        )) :
                        <tr>
                            <td colSpan='2'>No Requests Here</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }
}

export default FriendsRequestList;