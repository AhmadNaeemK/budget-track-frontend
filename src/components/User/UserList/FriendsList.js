import React from 'react'
import API from '../../../API';

import { FRIEND_LIST_URL } from '../../../Config';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';


class FriendsList extends React.Component {

    columns = [];

    constructor(props) {
        super(props);
        this.columns = [
            {
                name: 'Name',
                id: 'username',
                selector: row => row.username,
                sortable: true,
            },
            {
                name: 'Email',
                id:'email',
                selector: row => row.email,
            },
            {
                name: "UnFriend",
                button: true,
                cell: (row) => 
                    <button type="button" className='btn btn-danger' onClick={() => this.unFriend(row)}>UnFriend</button>
            }
        ];
    }

    unFriend = async (row) => {
        const res = await API.removeFriend(row.id)
        if (res.status === 204) {
            alert(`UnFriended ${row.username}`)
        }
    }


    dataRequest = async (params) => {
        const res = await API.fetchFriendsList(FRIEND_LIST_URL + params);
        return res
    }


    render() {
        return (
            <BaseDataTableComponent
                paginated = {true}
                searchAble = {true}
                columns = {this.columns}
                fetchDataRequest = { this.dataRequest }
            />
        )
    }
}

export default FriendsList;