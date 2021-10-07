import { TimeScale } from 'chart.js';
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
            alert("Payment Succesful");
            event.target.parentNode.parentNode.reset();
        }
    }

    render() {
        return (
            <>
                {this.props.split &&
                    < div className='d-flex justify-content-between'>
                        <div>
                            <p>Required Amount</p>
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
        this.constructor = this.columns = [{
            name: 'Title',
            id: 'title',
            selector: row => row.title,
            sortable: true,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Total Amount',
            id: 'total_amount',
            selector: row => row.total_amount,
            sortable: true,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Creator',
            id: 'creator',
            selector: row => row.creator.username,
            sortable: true,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Paying Friend',
            id: 'paying_friend',
            selector: row => row.paying_friend.username,
            sortable: true,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Friends Involved',
            id: 'all_friends_involved',
            cell: (row, index, column, id) => (
                <ul>
                    {row.all_friends_involved.map(friend => (
                        <li key={friend.id}>{friend.username}</li>
                    ))}
                </ul>
            ),
            sortable: true,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Delete',
            button: true,
            cell: (row) => <>
                {localStorage.getItem('username') === row.creator.username &&
                    <button type="button" className='btn btn-danger' onClick={() => this.deleteSplit(row)}>Delete</button>
                }
            </>
            ,
            center: true,
            compact: true,
            wrap: true,
        },
        {
            name: 'Edit',
            button: true,
            cell: (row) =>
                <>
                    {!row.completed_payment &&
                        <button type="button"
                            className='btn btn-success'
                            data-bs-toggle='modal'
                            data-bs-target='#splitPaymentModal'
                            onClick={() => this.paySplit(row)}>Pay</button>
                    }
                </>
            ,
            center: true,
            compact: true,
            wrap: true,
        }
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

    paySplit = (row) => {
        this.setState({
            paying_split: row
        }
        )
    }

    dataRequest = async (params) => {
        const res = await API.fetchSplitTransactionList(SPLIT_TRANSACTION_LIST_URL + params)
        return res
    }

    conditionalRows = [
        {
            when:  row => row.completed_payment ,
            style: {
                backgroundColor: categoryColor['Healthcare'],
            },
        },
        {
            when:  row => !row.completed_payment ,
            style: {
                backgroundColor: categoryColor['Grocery'],
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
                        />
                    }
                />
            </>
        )
    }
}

export default SplitTransactionList;