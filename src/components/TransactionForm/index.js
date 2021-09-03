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
                const newTransactions = await API.fetchTransactions(false)
                const newAccounts = await API.fetchAccount(false,true)
                this.props.transactionAccountHandler(newTransactions, newAccounts)
                this.setState(this.initialState)
            }
        } else {
            let newState = {'transactionId': this.props.transactionId}
            for (let s in this.state){
                if (this.state[s] !== '') newState = {...newState, [s]: this.state[s]}
            }
            const res = await API.updateTransactions(newState);
            console.log(res)
            if (res && res.status === 202){
                const newTransactions = await API.fetchTransactions(false)
                const newAccounts = await API.fetchAccount(false,true)
                this.props.transactionAccountHandler(newTransactions, newAccounts)
                this.setState(this.initialState)
            }
        }
    }

    render () {
        return (
        <div className='border rounded border-white p-4 m-2'>
            <form>
                {this.props.title? <h3>{this.props.title}</h3>: null }
                <label for='title'>Transaction Title</label>
                <input className='form-control' type='text' name='title' onChange={this.handleChange}/>

                <label for='description'>Description</label>
                <input className='form-control' type='text' name='description' onChange={this.handleChange}/>

                <label for='credit_account'>Credit Account</label>
                <select className='form-select' name='credit_account' onChange={this.handleChange}>
                    {this.props.accounts.map( (account) => (
                        <option key={account.id} value={account.id}>{account.title}</option>
                    ) )}
                </select>

                <label for='debit_account'>Debit Account</label>
                <select className='form-select' name='debit_account' onChange={this.handleChange}>
                    {this.props.accounts.map( (account) => (
                        <option key={account.id} value={account.id}>{account.title}</option>
                    ) )}
                </select>
                
                <div className='form-group'>
                    <label for='amount'>Amount</label>
                    <input className='form-control' type='number' name='amount' onChange={this.handleChange}/>
                </div>

                <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Add</button>
            </form>

        </div>
    )
    }
}

export default TransactionForm;