import React from 'react'
import API from '../../../API';

import { USER_LIST_URL } from '../../../Config';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';


class UsersList extends React.Component {

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
                id: 'email',
                selector: row => row.email,
            },
            {
                name: 'Send Request',
                button: true,
                minWidth: '30%',
                cell: (row) => 
                    <button type="button" className='btn btn-success' onClick={() => this.sendRequest(row)}>Send Request</button> 
            }
        ];
    }
    

    sendRequest = async (row) => {
        const res = await API.createFriendRequest({ user: localStorage.userid, receiver: row.id })
        if (res.status === 201) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(await res.json())
        }
    }


    dataRequest = async (params) => {
        const res = await API.fetchUserList(USER_LIST_URL + params);
        return res
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    render() {
        return (
            <BaseDataTableComponent
                paginated = {true}
                searchAble = {true}
                columns = {this.columns}
                fetchDataRequest = { this.dataRequest }
                setMethods ={this.acceptChildMethodsForUpdate}
            />
        )
    }
}

export default UsersList;