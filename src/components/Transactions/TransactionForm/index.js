import React from 'react'

import API from '../../../API';

class TransactionForm extends React.Component {

    initialState = {
        'title': '',
        'description': '',
        'cash_account': '',
        'category': '',
        'user': localStorage.getItem('userid'),
        'amount': '',
    }

    constructor(props) {
        super(props);
        if (props.title === 'Create Transactions') {
            this.initialState.category = props.categories[0][0]
            this.initialState.cash_account = props.accounts[0].id
        }
        this.state = this.initialState;
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const incomeCategory = this.props.categories.find(category => category[1] === "Income")[0]
        const create = async () => {
            const formData = { ...this.state, transaction_time: new Date() }
            if (String(formData.category) === String(incomeCategory)) {
                const res = await API.createIncome(formData)
                if (res && res.status === 201) {
                    const newTransactions = await API.fetchIncomeList(new Date().getMonth() + 1)
                    const newAccounts = await API.fetchCashAccountList()
                    this.props.transactionAccountHandler('incomes', newTransactions, newAccounts)
                } else {
                    const error = await res.json()
                    alert(error[Object.keys(error)[0]])
                }
            } else {
                const res = await API.createExpense(formData)
                if (res && res.status === 201) {
                    const newTransactions = await API.fetchExpenseList(new Date().getMonth() + 1)
                    const newAccounts = await API.fetchCashAccountList()
                    this.props.transactionAccountHandler('expenses', newTransactions, newAccounts)
                } else {
                    const error = await res.json()
                    alert(error[Object.keys(error)[0]])
                }
            }
        }

        const update = async () => {
            const formData = { 'amount': this.state.amount }
            const transactionId = this.props.transaction.id
            if (this.props.transaction.category === incomeCategory) {
                const res = await API.updateIncome(transactionId, formData)
                if (res && res.status === 200) {
                    const newTransactions = await API.fetchIncomeList(new Date().getMonth() + 1)
                    const newAccounts = await API.fetchCashAccountList()
                    this.props.transactionAccountHandler('incomes', newTransactions, newAccounts)
                } else {
                    const error = await res.json()
                    alert(error[Object.keys(error)[0]])
                }
            } else {
                const res = await API.updateExpense(transactionId, formData)
                if (res && res.status === 200) {
                    this.props.transactionAccountHandler('expenses')
                } else {
                    const error = await res.json()
                    alert(error[Object.keys(error)[0]])
                }
            }
        }

        if (this.props.title === "Create Transactions") {
            await create();
        } else {
            await update();
        }
        event.target.parentNode.reset()
    }

    render() {
        return (
            <div className={'border rounded border-white p-4 m-2 ' + this.props.className} >
                {this.props.title === "Create Transactions" ? (
                    <form>
                        {this.props.title ? <h3>{this.props.title}</h3> : null}
                        <div className='mb-3'>
                            <label htmlFor='title'>Transaction Title</label>
                            <input className='form-control' type='text' name='title' onChange={this.handleChange} placeholder="Add title here" />
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className='mb-3'>
                                    <label htmlFor='cash_account'>Cash Account</label>
                                    <select className='form-select' name='cash_account' onChange={this.handleChange}>
                                        {
                                            this.props.accounts.map((account) => (
                                                <option key={account.id} value={account.id}>{account.title}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='mb-3'>
                                    <label htmlFor='category'>Category</label>
                                    <select className='form-select' name='category' onChange={this.handleChange}>
                                        {
                                            this.props.categories.map((category) => (
                                                <option key={category[0]} value={category[0]}>{category[1]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='amount'>Amount</label>
                            <input className='form-control' type='number' name='amount' onChange={this.handleChange} placeholder="Add amount here" />
                        </div>


                        <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>
                            Add
                        </button>
                    </form>
                ) : (
                    <form>
                        <div className='mb-3'>
                            <label htmlFor='amount'>Amount</label>
                            <input className='form-control' type='number' name='amount' onChange={this.handleChange} />
                        </div>

                        <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>
                            Update
                        </button>
                    </form>
                )
                }
            </div>
        )
    }
}

export default TransactionForm;