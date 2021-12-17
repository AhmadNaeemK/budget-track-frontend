import React from 'react'

import API from '../../../API'
import { EXPENSE_LIST_URL } from '../../../Config';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';
import ModalComponent from '../../Modals';
import TransactionForm from '../TransactionForm';

class ExpenseList extends React.Component {
    columns = []
    buttons = [{
        name: 'Actions',
        button: true,
        cell: (row) =>
            <div className='d-flex'>
                <div className='m-1'>
                    <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteTransaction(row)}>
                        <i className='fa fa-trash' />
                    </button>
                </div>
                <div className='m-1'>
                    <button type="button"
                        className='btn btn-outline-success'
                        data-bs-toggle='modal'
                        data-bs-target='#tModal'
                        onClick={() => this.handleEditTransaction(row)}
                    >
                        <i className='fa fa-pencil-square-o' />
                    </button>
                </div>
            </div>
        , minWidth: '15%',
    },
    ]
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
            wrap: true,
        },
        {
            name: 'Account',
            id: 'cash_account',
            selector: row => row.cash_account.title,
            sortable: true,
        },
        {
            name: 'Date',
            id: 'transaction_time',
            selector: row => {
                const date = new Date(row.transaction_time)
                return `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()}`
            },
            sortable: true,
        },
        {
            name: 'Category',
            id: 'categroy',
            selector: row => row.category[1],
            sortable: true,
        },
        {
            name: 'Amount',
            id: 'amount',
            selector: row => row.amount,
            sortable: true,
        },
        ]

        if (props.require_buttons) {
            this.columns = [...this.columns, ...this.buttons]
        }
    }

    handleEditTransaction = (row) => {
        this.setState({
            transaction_edit: row
        })
    }

    deleteTransaction = async (row) => {
        const res = await API.deleteExpense(row.id)
        if (res.status === 204) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(await res.json())
        }
    }
    updateTransaction = (newTransaction) => {
        let data = this.getData()
        const editRowIndex = data.findIndex(dataRow => dataRow.id === this.state.transaction_edit.id)
        data[editRowIndex] = newTransaction
        this.updateData(data)
    }

    dataRequest = async (params) => {
        const res = API.fetchExpenseList(this.props.month, EXPENSE_LIST_URL + params + `&month=${this.props.month}`)
        return res
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    render() {
        return (
            <>
                <BaseDataTableComponent
                    columns={this.columns}
                    paginated={this.props.paginated}
                    searchAble={this.props.searchAble}
                    fetchDataRequest={this.dataRequest}
                    setMethods={this.acceptChildMethodsForUpdate}
                />
                <ModalComponent
                    id='tModal'
                    title='Edit Transaction'
                    modalBody={
                        <TransactionForm
                            transaction={this.state.transaction_edit}
                            transactionHandler={this.updateTransaction}
                            categories={this.props.transactionCategories}
                        />
                    }
                />
            </>
        )
    }
}

export default ExpenseList;