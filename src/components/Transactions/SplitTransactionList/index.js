import React from 'react'

import API from '../../../API';
import { SPLIT_TRANSACTION_LIST_URL } from '../../../Config';
import { categoryColor } from '../../Charts&Tables/Utils/chartUtils';

import BaseDataTableComponent from '../../Charts&Tables/BaseDataTableComponent';
import ModalComponent from '../../Modals'

class PaySplitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentData: {},
            amount: 0,
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props !== prevProps && this.props.split) {
            const paymentData = await API.fetchSplitPaymentData(this.props.split.id)
            this.setState({ paymentData: paymentData })
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const cleanedFormData = {
            'amount': this.state.amount,
            'split_id': this.props.split.id,
        }
        const res = await API.paySplit(cleanedFormData)
        if (res.status === 200) {
            const newSplitPaymentDetails = await API.fetchSplitPaymentData(this.props.split.id)
            const userIndex = this.props.split.all_friends_involved.findIndex(friend => friend.username === localStorage.getItem('username'))
            this.props.split.all_friends_involved[userIndex].payable = newSplitPaymentDetails.required
            this.props.split.all_friends_involved[userIndex].paid = newSplitPaymentDetails.paid
            const split = this.props.split
            this.props.updateTable(split)
            alert('Payment Succesful')
        }
        else {
            const error = res.json()
            alert(error[Object.keys(error)[0]])
        }
    }

    render() {
        return (
            <>
                {this.props.split &&
                    < div className='d-flex justify-content-between'>
                        <div>
                            <p>Payable Amount</p>
                            <p>{this.state.paymentData.required}</p>
                        </div>
                        <div>
                            <p>Paid Amount</p>
                            <p>{this.state.paymentData.paid}</p>
                        </div>
                        <div>
                            <p>Total Amount</p>
                            <p>{this.props.split.total_amount}</p>
                        </div>
                    </div>
                }
                <form>
                    <div className='mb-3'>
                        <label htmlFor='amount'>Pay Amount</label>
                        <input
                            type='number'
                            name='amount'
                            className='form-control'
                            placeholder='Add total amount here'
                            onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                        />
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Pay</button>
                    </div>
                </form>
            </>
        )
    }
}

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
            name: 'Friends Involved',
            id: 'all_friends_involved',
            cell: (row) => (
                <ul style={{ listStyle: 'none', minWidth: '90%', padding:'0'}}>
                    {row.all_friends_involved.map(friend => (
                        <li key={friend.id} className='d-flex justify-content-between'>
                            <div className='m-1'>{friend.username} </div>
                            <div className='m-1'><b>{friend.payable}</b> </div>
                        </li>
                    ))}
                </ul>
            ),
            sortable: true,
            minWidth:'15%'
        },
        {
            name: 'Actions',
            button: true,
            minWidth: '15%',
            cell: (row) => <div className='d-flex'>
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

    conditionalRows = [
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

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }



    render() {
        return (
            <>
                <BaseDataTableComponent
                    fetchDataRequest={this.dataRequest}
                    paginated={true}
                    searchAble={true}
                    columns={this.columns}
                    conditionalRowStyles={this.conditionalRows}
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