import React from 'react'

import API from '../../../API';
import { SPLIT_TRANSACTION_LIST_URL } from '../../../Config';
import { categoryColor } from '../../Charts&Tables/Utils/chartUtils';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';
import ModalComponent from '../../Modals'
import PaySplitForm from '../../SplitExpenseData/PaySplitForm';
import { Link } from 'react-router-dom';



class SplitTransactionList extends React.Component {

    columns = []

    constructor(props) {
        super(props);
        this.state = {
            paying_split: null
        }
        this.columns = [{
            name: 'Title',
            id: 'title',
            selector: row => row.title,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Category',
            id: 'Category',
            selector: row => row.category[1],
            sortable: true,
            wrap: true,
        },
        {
            name: 'Total Amount',
            id: 'total_amount',
            selector: row => row.total_amount,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.paying_friend.username === localStorage.getItem('username'),
                    style: {
                        color: categoryColor['Healthcare'],
                    },
                },
                {
                    when: row => row.paying_friend.username !== localStorage.getItem('username'),
                    style: {
                        color: categoryColor['Grocery'],
                    },
                }
            ]
        },
        {
            name: 'Creator',
            id: 'creator',
            selector: row => row.creator.username,
            sortable: true,
        },
        {
            name: 'Paying Friend',
            id: 'paying_friend',
            selector: row => row.paying_friend.username,
            sortable: true,
        },
        {
            name: 'Actions',
            button: true,
            minWidth: '15%',
            left: true,
            style: {
                justifyContent: 'start'
            },
            cell: (row) => <div className='d-flex'>
                <div className='m-1'>
                    <Link to={`/splitExpense/${row.id}`}>
                        <button type="button" className='btn btn-outline-secondary'>
                            <i className='fas fa-info' />
                        </button>
                    </Link>
                </div>
                {localStorage.getItem('username') === row.creator.username &&
                    <div className='m-1'>
                        <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteSplit(row)}>
                            <i className='far fa-trash-alt' />
                        </button>
                    </div>
                }
                {row.paying_friend.username !== localStorage.getItem('username') &&
                    <div className='m-1'>
                        <button type="button"
                            className='btn btn-outline-success'
                            data-bs-toggle='modal'
                            data-bs-target='#splitPaymentModal'
                            onClick={() => this.handlePaySplit(row)}
                        >
                            <i className='fas fa-hand-holding-usd fa-lg' />
                        </button>
                    </div>
                }
            </div>
            ,
        },
        ]
    }

    deleteSplit = async (row) => {
        const res = await API.deleteSplitTransaction(row.id)
        if (res.status === 204) {
            let data = this.getData();
            data = data.filter(dataRow => dataRow.id !== row.id);
            this.updateData(data);
        } else {
            alert(await res.json())
        }
    }

    handlePaySplit = (row) => {
        this.setState({
            paying_split: row
        })
    }

    updateAfterPayment = (newSplit) => {
        let data = this.getData()
        const editRowIndex = data.findIndex(dataRow => dataRow.id === this.state.paying_split.id)
        data[editRowIndex] = newSplit
        this.updateData(data)
    }

    dataRequest = async (params) => {
        const res = await API.fetchSplitTransactionList(SPLIT_TRANSACTION_LIST_URL + params)
        return res
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    componentDidMount() {
        if (this.props.createdSplit) {
            let data = this.getData()
            data.push(this.props.createdSplit)
            this.updateData(data)
        }
    }

    render() {
        return (
            <>
                <BaseDataTableComponent
                    fetchDataRequest={this.dataRequest}
                    paginated={true}
                    searchAble={true}
                    columns={this.columns}
                    setMethods={this.acceptChildMethodsForUpdate}
                />
                <ModalComponent
                    id='splitPaymentModal'
                    title='Pay the Split'
                    modalBody={
                        <PaySplitForm
                            split={this.state.paying_split}
                            updateTable={this.updateAfterPayment}
                        />
                    }
                />
            </>
        )
    }
}

export default SplitTransactionList;