import React from 'react'

import API from '../../../API';

import { SCHEDULED_TRANSACTION_LIST_URL } from '../../../Config';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';

class ScheduledTransactionList extends React.Component {
    columns = []
    constructor(props) {
        super(props);
        this.columns = [
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true,
            },
            {
                name: 'Cash Account',
                selector: row => row.cash_account.title,
                sortable: true,
            },
            {
                name: 'Date',
                selector: row => {
                    const date =  new Date(row.transaction_time)
                    return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
                },
                sortable: true,
            },
            {
                name: 'Amount',
                selector: row => row.amount,
                sortable: true,
            },
            {
                name: 'Category',
                selector: row => props.categories[row.category][1],
                sortable: true,
            },
            {
                name: 'Delete',
                button: true,
                cell: (row) =>
                    <button type="button" className='btn btn-danger' onClick={() => this.deleteTransaction(row)}>Delete</button>
            }
        ];
    }

    deleteTransaction = async (row) => {
        const res = await API.deleteScheduledTransaction(row.id)
        if (res.status === 204) {
            this.render()
        } else {
            alert(await res.json())
        }
    }

    dataRequest = async (params) => {
        const res = await API.fetchScheduledTransactionList(SCHEDULED_TRANSACTION_LIST_URL + params)
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

export default ScheduledTransactionList;