import React from 'react';
import { connect } from 'react-redux';

import API from '../API';
import { CASH_ACCOUNT_LIST_URL } from '../Config';

import AccountsForm from './Accounts/AccountsForm';
import BaseDataTableComponent from './Charts&Tables/BaseDataTableComponent';
import ModalComponent from './Modals';

class AllAccounts extends React.Component {

    columns = []

    constructor(props) {
        super(props);
        this.state = {
            account_edit: null
        }
        this.columns = [{
            name: 'Title',
            id: 'title',
            selector: row => row.title,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Balance',
            id: 'balance',
            selector: row => row.balance,
            sortable: true,
        },
        {
            name: 'Limit',
            id: 'limit',
            selector: row => row.limit,
            sortable: true,
        },
        {
            name: 'Expenses',
            id: 'expenses',
            selector: row => row.expenses,
            sortable: true,
        },
        {
            name: 'Actions',
            button: true,
            cell: (row) =>
                <div className='d-flex'>{row.title !== 'Cash' &&
                    <div className='m-1'>
                        <button type="button" className='btn btn-outline-danger redBtn' onClick={() => this.deleteAccount(row)}>
                            <i className='fa fa-trash' />
                        </button>
                    </div>
                }
                    <div className='m-1'>
                        <button type="button"
                            className='btn btn-outline-success'
                            data-bs-toggle='modal'
                            data-bs-target='#aModal'
                            onClick={() => this.editAccount(row)}
                        >
                            <i className='fa fa-pencil-square-o' />
                        </button>
                    </div>
                </div>,
            minWidth: '20%'
        }]
    }

    editAccount = (row) => {
        this.setState({
            account_edit: row
        })
    }

    deleteAccount = async (row) => {
        const res = await API.deleteCashAccount(row.id)
        if (res.status === 204) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(await res.json())
        }
    }

    updateAccount = (updatedAccount) => {
        let data = this.getData()
        const editRowIndex = data.findIndex(dataRow => dataRow.id === this.state.account_edit.id)
        data[editRowIndex] = updatedAccount
        this.updateData(data)
    }

    createAccount = (createdAccount) => {
        let data = this.getData()
        data.push(createdAccount)
        this.updateData(data)
    }

    dataRequest = async (params) => {
        const res = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + params)
        return res
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    render() {
        return (
            <div className='container mt-3'>

                <div className='d-flex mb-3'>
                    <button
                        className='btn primaryBtn'
                        data-bs-toggle='modal'
                        data-bs-target={`#account-create`}
                    >
                        Create Account
                    </button>
                    <ModalComponent
                        id='account-create'
                        title='Create Account'
                        modalBody={
                            <AccountsForm
                                type='creation' 
                                createAccount={this.createAccount}
                            />
                        }
                    />
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-start m-4'>
                            <h2>Accounts</h2>
                        </div>
                        <BaseDataTableComponent
                            columns={this.columns}
                            paginated={true}
                            searchAble={true}
                            fetchDataRequest={this.dataRequest}
                            setMethods={this.acceptChildMethodsForUpdate}
                        />
                    </div>
                </div>

                <ModalComponent
                    id='aModal'
                    title='Edit Account'
                    modalBody={
                        <AccountsForm
                            type='update'
                            account_edit={this.state.account_edit}
                            accountHandler={this.updateAccount} />
                    }
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    accounts: state.account.accounts
})

export default connect(mapStateToProps)(AllAccounts);