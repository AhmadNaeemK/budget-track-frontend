import React from 'react'

import BaseDataTableComponent from '../Charts&Tables/BaseDataTableComponent';

import API from '../../API';
import { SENT_FRIEND_REQUEST_LIST_URL } from '../../Config';

class SentRequests extends React.Component {

    columns = []

    constructor(props){
        super(props);
        this.columns = [
            {
                name: 'name',
                id: 'username',
                selector: row => row.receiver.username,
                sortable: true,
            },
            {
                name: 'Email',
                id: 'email',
                selector: row => row.receiver.email,
            },
            {
                name: 'Delete Request',
                button: true,
                cell: (row) => 
                    <button type="button" className='btn btn-danger' onClick={() => this.deleteRequest(row)}>Del</button> 
            }
        ];
    }

    deleteRequest = async (row) => {
        const res = await API.deleteFriendRequest(row.id)
        if (res.status === 204) {
            console.log(`Request to ${row.receiver.username} deleted`)
        } else {
            alert(res[Object.keys(res)[0]])
        }
    }


    dataRequest = async (params) => {
        const res = await API.fetchSentFriendRequestList(SENT_FRIEND_REQUEST_LIST_URL + params);
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

export default SentRequests;