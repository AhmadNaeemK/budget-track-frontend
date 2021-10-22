import React from 'react'

import BaseDataTableComponent from '../Charts&Tables/BaseDataTableComponent';

import API from '../../API';
import { RECEIVED_FRIEND_REQUEST_LIST_URL} from '../../Config';

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
                name: 'Actions',
                button: true,
                minWidth: '30%',
                cell: (row) =>
                    <div className='d-flex'>
                        <div className='m-1'>
                            <button type="button" className='btn btn-outline-success' onClick={() => this.acceptRequest(row)}>
                                <i className='fa fa-check' />
                            </button>
                        </div>
                        <div className='m-1'>
                            <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteRequest(row)}>
                                <i className='fa fa-times' />
                            </button>
                        </div>
                    </div>
            },
        ];
    }

    acceptRequest = async (row) => {
        const res = await API.acceptFriendRequest(row.id)
        if (res.status === 201) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(res[Object.keys(res)[0]])
        }
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
        const res = await API.fetchReceivedFriendRequestList(RECEIVED_FRIEND_REQUEST_LIST_URL + params);
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

export default ReceivedRequests;