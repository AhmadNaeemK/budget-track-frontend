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
                name: 'Delete',
                button: true,
                minWidth: '30%',
                cell: (row) => 
                    <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteRequest(row)}>
                        <i className='fa fa-trash' />
                    </button> 
            }
        ];
    }

    deleteRequest = async (row) => {
        const res = await API.deleteFriendRequest(row.id)
        if (res.status === 204) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(res[Object.keys(res)[0]])
        }
    }


    dataRequest = async (params) => {
        const res = await API.fetchSentFriendRequestList(SENT_FRIEND_REQUEST_LIST_URL + params);
        return res
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    render() {
        return (
            <BaseDataTableComponent
                paginated={true}
                searchAble={true}
                fetchDataRequest={this.dataRequest}
                columns={this.columns}
                setMethods={this.acceptChildMethodsForUpdate}
            />
        )
    }
}

export default SentRequests;