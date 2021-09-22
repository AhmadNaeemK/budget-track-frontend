import React from 'react'

import moment from 'moment';

import API from '../../API';

class ScheduleTransactionForm extends React.Component {

    initialState = {
        'title': '',
        'description': '',
        'cash_account': '',
        'category': '',
        'user': localStorage.getItem('userid'),
        'amount': '',
        'transaction_time': '',
    }


    constructor(props) {
        super(props);
        this.initialState.category = props.categories[0][0]
        this.initialState.cash_account = props.accounts[0].id
        this.state = this.initialState;
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const timeFormated = moment(this.state.transaction_time).format('YYYY-MM-DDTHH:mm:ss.00000ZZ')
        const newState = {...this.state, transaction_time: timeFormated}
        const res = await API.createScheduledTransaction(newState)
        if (res.status === 201) {
            alert ("Transaction Scheduled")
            this.props.scheduledTransactionHandler()
        } else {
            const error = await res.json()
            alert(error[Object.keys(error)[0]])
        }

        
    }

    render() {
        return (
            <div className='border rounded border-white p-4 m-2 '>
                <form>
                    <h3>Schedule A Transaction</h3>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input className='form-control' type='text' name='title' placeholder='Add title here' onChange={this.handleChange} />
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor='cash_account'>Cash Account</label>
                                <select className='custom-select' name='cash_account' onChange={this.handleChange}>
                                    {
                                        this.props.accounts.map((account) => (
                                            <option key={account.id} value={account.id}>{account.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor='category'>Category</label>
                                <select className='custom-select' name='category' onChange={this.handleChange}>
                                    {
                                        this.props.categories.map((category) => (
                                            <option key={category[0]} value={category[0]}>{category[1]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor='amount'>Amount</label>
                                <input className='form-control' type='number' name='amount' onChange={this.handleChange} placeholder="Add amount here" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor='transaction_time'>Time</label>
                                <input className='form-control' type='datetime-local' name='transaction_time' onChange={this.handleChange} placeholder="Add Date here" />
                            </div>
                        </div>
                    </div>


                    <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>
                        Schedule
                    </button>

                </form>
            </div>
        )
    }
}

export default ScheduleTransactionForm;