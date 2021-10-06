import React from 'react';

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
            transaction_edit: null
        }
        this.columns = [{
            name: 'Title',
            id: 'title',
            selector: row => row.title,
            sortable: true,
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
            name: 'Delete',
            button: true,
            cell: (row) => <>{row.title !== 'Cash' &&
                <button type="button" className='btn btn-danger' onClick={() => this.deleteAccount(row)}>Delete</button>
            }
            </>
        },
        {
            name: 'Edit',
            button: true,
            cell: (row) =>
                <button type="button"
                    className='btn btn-success'
                    data-bs-toggle='modal'
                    data-bs-target='#aModal'
                    onClick={() => this.editAccount(row)}>Edit</button>
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
            alert(`${row.id} deleted`)
        } else {
            alert(await res.json())
        }
    }

    dataRequest = async (params) => {
        const res = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + params)
        return res
    }

    render() {
        return (
            <div className='container mt-3'>

                <div className='d-flex mb-3'>
                    <button
                        className='btn btn-outline-primary'
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
                                type='creation' accountHandler={() => { window.location.reload() }} />
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
                        />
                    </div>
                </div>

                <ModalComponent
                    id='aModal'
                    title='Edit Account'
                    modalBody={
                        <AccountsForm
                            type='update'
                            accountId={this.state.accountId}
                            accountHandler={this.accountHandler} />
                    }
                />
            </div>
        )
    }

}

export default AllAccounts;