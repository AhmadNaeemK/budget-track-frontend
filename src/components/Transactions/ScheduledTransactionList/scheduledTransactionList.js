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
                wrap: true
            },
            {
                name: 'Cash Account',
                selector: row => row.cash_account.title,
                sortable: true,
            },
            {
                name: 'Date',
                selector: row => {
                    const date = new Date(row.transaction_time)
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
                name: 'Action',
                button: true,
                minWidth: '15%',
                cell: (row) =>
                    <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteTransaction(row)}>
                        <i className='far fa-trash-alt' />
                    </button>
            }
        ];
    }

    deleteTransaction = async (row) => {
        const res = await API.deleteScheduledTransaction(row.id)
        if (res.status === 204) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(await res.json())
        }
    }

    dataRequest = async (params) => {
        const res = await API.fetchScheduledTransactionList(SCHEDULED_TRANSACTION_LIST_URL + params)
        return res
    }
    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    componentDidMount = () => {
        this.props.setMethods(this.updateData, this.getData);
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

export default ScheduledTransactionList;