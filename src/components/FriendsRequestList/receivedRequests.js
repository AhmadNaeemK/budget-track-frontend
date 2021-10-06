import React from 'react'

import BaseDataTableComponent from '../Charts&Tables/BaseDataTableComponent';

import API from '../../API';
import { RECEIVED_FRIEND_REQUEST_LIST_URL, SENT_FRIEND_REQUEST_LIST_URL } from '../../Config';

class ReceivedRequests extends React.Component {

    columns = []

    constructor(props) {
        super(props);
        this.columns = [
            {
                name: 'Name',
                id: 'username',
                selector: row => row.user.username,
                sortable: true,
            },
            {
                name: 'Email',
                id: 'email',
                selector: row => row.user.email,
            },
            {
                name: 'Delete Request',
                button: true,
                cell: (row) =>
                    <button type="button" className='btn btn-success' onClick={() => this.acceptRequest(row)}>Accept</button>
            }
        ];
    }

    acceptRequest = async (row) => {
        const res = await API.acceptFriendRequest(row.id)
        if (res.status === 201) {
            alert("Request Accepted")
        } else {
            alert(res[Object.keys(res)[0]])
        }
    }


    dataRequest = async (params) => {
        const res = await API.fetchReceivedFriendRequestList(RECEIVED_FRIEND_REQUEST_LIST_URL + params);
        return res
    }

    render() {
        return (
            <BaseDataTableComponent
                paginated={true}
                searchAble={true}
                fetchDataRequest={this.dataRequest}
                columns={this.columns}
            />
        )
    }
}

export default ReceivedRequests;