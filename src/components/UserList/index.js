import React from 'react'
import API from '../../API';

import { USER_LIST_URL, FRIEND_LIST_URL } from '../../Config';

import DataTable from 'react-data-table-component';



class UserList extends React.Component {

    columns = []

    constructor(props) {
        super(props)
        this.state = {
            userslist: [],
            totalRows: 0,
            isLoaded: false,
            pageSize: 10
        }

        this.columns = [
            {
                name: 'Username',
                selector: row => row.username,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
            },
            {
                name: props.userType === "Users" ? 'Send Request' : "UnFriend",
                button: true,
                cell: (row) => props.userType === "Users" ?
                    <button className='btn btn-success' onClick={() => this.sendRequest(row)}>Send Request</button> :
                    <button className='btn btn-danger' onClick={() => this.unFriend(row)}>UnFriend</button>
            }
        ];
    }

    componentDidMount() {
        (async () => {
            const params = `?page=${1}` + `&page_size=${this.state.pageSize}`
            const userslist = this.props.userType === "Users" ? await API.fetchUserList(USER_LIST_URL + params) : await API.fetchFriendsList(FRIEND_LIST_URL + params);
            this.setState({ userslist: userslist.results, totalRows: userslist.count })
        })().then(() => { this.setState({ isLoaded: true }) })
    }

    changePage = (page, totalRows) => {
        this.setState({ isLoaded: false });
        (async () => {
            const params = `?page=${page}` + `&page_size=${this.state.pageSize}`
            const userslist = this.props.userType === "Users" ? await API.fetchUserList(USER_LIST_URL + params) :
                await API.fetchUserList(FRIEND_LIST_URL + params)
            this.setState({ userslist: userslist.results })
        })().then(() => { this.setState({ isLoaded: true }) })
    }

    changePageSize = (currentRowsPerPage, currentPage) => {
        this.setState({pageSize: currentRowsPerPage})
        this.changePage(currentPage)
    }



    sendRequest = async (row) => {
        const res = await API.createFriendRequest({ user: localStorage.userid, receiver: row.id })
        if (res.status === 201) {
            const newUserList = this.state.userslist.filter(user => user.id == row.id )
            this.setState({ userslist: newUserList })
            alert("Request Sent")
            this.props.requestHandler();
        }
    }

    unFriend = async (row) => {
        const res = await API.removeFriend(row.id)
        if (res.status === 204) {
            alert(`UnFriended ${row.username}`)
        }
    }

    customStyles = {
        tableWrapper: {
            border: '2px',
            borderRadius: '20%',
        },
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                width: '200px',
                marginRight: '40px',
            },
        },
        cells: {
            style: {
                paddingLeft: '16px', // override the cell padding for data cells
                paddingRight: '16px',
                marginRight: '40px',
                alignItems: 'center',
                display: 'flex',
            },
        },
    };

    render() {
        return (
            <div style={{ maxWidth: '100%' }}>
                <DataTable
                    theme='dark'
                    striped={true}
                    columns={this.columns}
                    data={this.state.userslist}
                    pagination={true}
                    noDataComponent="No Such Users"
                    onChangePage={(page, totalRows) => {
                        this.changePage(page, totalRows)
                    }}
                    paginationServer={true}
                    paginationPerPage={this.state.pageSize}
                    paginationTotalRows={this.state.totalRows}
                    customStyles={this.customStyles}
                />
            </div>
        )
    }
}

export default UserList;