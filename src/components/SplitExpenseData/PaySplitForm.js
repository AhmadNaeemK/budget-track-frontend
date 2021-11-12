import React from 'react'

import API from '../../API';

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
            const error = await res.json()
            alert(error)
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
                        <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit}>Pay</button>
                    </div>
                </form>
            </>
        )
    }
}

export default PaySplitForm;