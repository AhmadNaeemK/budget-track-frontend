import React from 'react'

import API from '../../../API'
import { INCOME_LIST_URL } from '../../../Config';
import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';
import ModalComponent from '../../Modals';
import TransactionForm from '../TransactionForm';

class IncomeList extends React.Component {

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
            name: 'Cash Account',
            id: 'cash_account',
            selector: row => row.cash_account.title,
            sortable: true,
        },
        {
            name: 'Date',
            id: 'transaction_time',
            selector: row => {
                const date =  new Date(row.transaction_time)
                return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
            },
            sortable: true,
        },
        {
            name: 'Amount',
            id: 'amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Delete',
            button: true,
            cell: (row) =>
                <button type="button" className='btn btn-danger' onClick={() => this.deleteTransaction(row)}>Delete</button>
        },
        {
            name: 'Edit',
            button: true,
            cell: (row) =>
                <button type="button"
                    className='btn btn-success'
                    data-bs-toggle='modal'
                    data-bs-target='#tModal'
                    onClick={() => this.handleEditTransaction(row)}>Edit</button>
        }]
    }

    deleteTransaction = async (row) => {
        const res = await API.deleteIncome(row.id)
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
        const editRowIndex=data.findIndex(dataRow => dataRow.id === this.state.transaction_edit.id)
        data[editRowIndex]=newTransaction
        this.updateData(data)
    }

    handleEditTransaction = (row) => {
        this.setState({
            transaction_edit: row
        })
    }

    dataRequest = async (params) => {
        const res = await API.fetchIncomeList(this.props.month, INCOME_LIST_URL + params + `&month=${this.props.month}`)
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
                    setMethods = {this.acceptChildMethodsForUpdate}
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

export default IncomeList;