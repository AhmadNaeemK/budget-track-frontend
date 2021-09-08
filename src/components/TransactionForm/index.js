import React from 'react'

import API from '../../API';

class TransactionForm extends React.Component {

    initialState = {'title': '',
                    'description': '',
                    'credit_account': '',
                    'debit_account': '',
                    'amount': '',
                    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.props.title === "Create Transactions"){
            const res = await API.createTransactions(this.state);
            if (res && res.status === 201){
                const newTransactions = await API.fetchTransactions(true)
                const newAccounts = await API.fetchAccount(false,false,true)
                this.props.transactionAccountHandler(newTransactions, newAccounts)
                this.setState(this.initialState)
            } else {
                alert (res);
            }
        } else {
            let newState = {'transactionId': this.props.transactionId}
            for (let s in this.state){
                if (this.state[s] !== '') newState = {...newState, [s]: this.state[s]}
            }

            const res = await API.updateTransactions(newState);
            if (res && res.status === 202){
                const newTransactions = await API.fetchTransactions(false)
                const newAccounts = await API.fetchAccount(false,false,true)
                this.props.transactionAccountHandler(newTransactions, newAccounts)
                this.setState(this.initialState)
            } else {
                const error = await res.json()
                alert(error.non_field_errors)
            }
        }
    }

    render () {
        return (
        <div className={'border rounded border-white p-4 m-2 ' + this.props.className } >
            <form>
                {this.props.title? <h3>{this.props.title}</h3>: null }
                <label htmlFor='title'>Transaction Title</label>
                <input className='form-control' type='text' name='title' onChange={this.handleChange}/>

                <label htmlFor='description'>Description</label>
                <input className='form-control' type='text' name='description' onChange={this.handleChange}/>

                <label htmlFor='credit_account'>Credit Account</label>
                <select className='form-select' name='credit_account' onChange={this.handleChange}>
                    {this.props.accounts
                        .filter( (account) => ['Cash', 'Salary'].includes(account.category))
                        .map( (account) => (
                            <option key={account.id} value={account.id}>{account.title}</option>
                        ))
                    }
                </select>

                <label htmlFor='debit_account'>Debit Account</label>
                <select className='form-select' name='debit_account' onChange={this.handleChange}>
                    {this.props.accounts
                        .filter( (account) => !['Cash', 'Salary'].includes(account.category))
                        .map( (account) => (
                            <option key={account.id} value={account.id}>{account.title}</option>
                        ))
                    }
                </select>
                
                <div className='form-group'>
                    <label htmlFor='amount'>Amount</label>
                    <input className='form-control' type='number' name='amount' onChange={this.handleChange}/>
                </div>

                <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>
                    { this.props.title==='Create Transactions' ? 'Add' : 'Update' }
                </button>
            </form>

        </div>
    )
    }
}

export default TransactionForm;