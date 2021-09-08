import React from 'react'

import API from '../API';

import TransactionForm from './TransactionForm';

import CashAccountsChart from './Charts/CashAccountChart';
import ExpenseAccountsChart from './Charts/ExpenseAccountsChart';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class AllTransactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            expenseAccountsData: [],
            transactions: [],
            transactionId: null,
            month: new Date().getMonth() + 1,
        }

    }

    handleDelete = async (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteTransactions(transactionId);
        if (res.status === 204) {
            const newTransactions = this.state.transactions.filter( transaction => transaction.id !== transactionId);
            this.setState({transactions: newTransactions})
        }
    }

    handleEdit = (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        this.setState({ transactionId: transactionId })
    }

    handleMonthChange = (event) => {
        (async () => {
            this.setState({month: parseInt(await event.target.value)});
            const AllTransactions = await API.fetchTransactions(this.state.month,true);
            const expenseAccounts = await API.getExpenseAccountsData(this.state.month);
            console.log(AllTransactions)
            this.setState({ transactions: AllTransactions, expenseAccountsData: expenseAccounts})
        })();
    }

    transactionHandler = (t) => {
        this.setState({
            transactions: t
        })
    }


    componentDidMount() {
        (async () => {
            const AllTransactions = await API.fetchTransactions(this.state.month,true);
            const AllAccounts = await API.fetchAccount(false,false,true)
            const expenseAccounts = await API.getExpenseAccountsData(this.state.month)
            this.setState({ transactions: AllTransactions , accounts: AllAccounts, expenseAccountsData: expenseAccounts})
        })();
    }

    render() {
        return (
            <div className = 'p-2 m-2'>
                <div className='d-flex justify-content-center'>
                <div className='w-20'>
                    <CashAccountsChart accounts={this.state.accounts} />
                    </div>

                    <div className='w-20'>
                    <ExpenseAccountsChart expenseAccounts={this.state.expenseAccountsData} month={this.state.month} />
                    </div>
                    <TransactionForm className='w-50'
                            title= 'Create Transactions'
                            transactionId= {this.state.transactionId}
                            accounts= {this.state.accounts} 
                            transactionAccountHandler ={this.transactionHandler}/>
                </div>

                <div className='border rounded border-white p-2 m-2'>
                    <table className='table table-dark table-striped'>

                        <thead><tr>
                            <th className='bg-dark' colSpan='8'>Transactions</th>
                            <th className='bg-dark'> 
                                <label htmlFor="month">Month</label>
                                <select name='month' onChange={this.handleMonthChange}>
                                    {monthNames.map( (month, index) => (
                                    <option value={index+1} selected={index+1 === this.state.month ? true: null} > {month} </option>    
                                    ))}
                                </select>
                            </th>
                        </tr></thead>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>

                            {this.state.transactions.map((transaction) => (
                                <tr key={transaction.id} id={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.credit_account}</td>
                                    <td>{transaction.debit_account}</td>
                                    <td>{transaction.transaction_date.match(/\d{4,}-\d{2}-\d{2}/)}</td>
                                    <td>{transaction.transaction_date.match(/\d+:\d+/)}</td>
                                    <td>{transaction.amount}</td>
                                    <td><button className='btn btn-danger' onClick={this.handleDelete}>Del</button>
                                        <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#tModal`} onClick={this.handleEdit}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="modal fade" id="tModal" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLongTitle">Edit Transactions</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <TransactionForm
                            transactionId= {this.state.transactionId}
                            accounts= {this.state.accounts} 
                            transactionAccountHandler ={this.transactionHandler}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>                 
            </div>
            )
    }

}

export default AllTransactions