import React from 'react'

import TransactionList from './Transactions';
import TransactionForm from './TransactionForm';
import AccountsList from './Accounts'
import AccountsForm from './AccountsForm'

import ExpenseAccountsChart from './Charts/ExpenseAccountsChart';
import CashAccountsChart from './Charts/CashAccountChart';


import API from '../API';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            loggedIn: false,
            accounts: [],
            transactionId: null,
            accountId: null,
            month : new Date().getMonth() + 1,
            expenseAccountsData: []
        }
    }

    transactionAccountHandler = async () => {
        const newTransactions = await API.fetchTransactions(this.state.month,false)
        const newAccounts = await API.fetchAccount(false,false,true)
        this.setState({
            transactions: newTransactions,
            accounts: newAccounts,
        })
    }

    // edit forms
    transactionIdHandler = (t) => {
        this.setState({
            transactionId: t
        })
    }

    accountIdHandler = (a) => {
        this.setState({
            accountId: a
        })
    }

    componentDidMount() {
        this.setState({ loggedIn: localStorage.getItem('userid') ? true : false });
        const fetchThings = async () => {
            const month = new Date().getMonth() + 1
            const transactions = await API.fetchTransactions(month,false);
            const accounts = await API.fetchAccount(false, false, true);
            const expenseAccounts = await API.getExpenseAccountsData(month)
            this.setState({ accounts: accounts , transactions: transactions, expenseAccountsData: expenseAccounts})
        }
        fetchThings()
    }


    render() {
        return (
            <div className='container-fluid m-2 p-2'>

                <div className=' row'>
                    <div className='col'>
                        <TransactionList transactions={this.state.transactions}
                            transactionAccountHandler={this.transactionAccountHandler}
                            transactionIdHandler={this.transactionIdHandler} />
                    </div>
                    <div className='col'>
                        <TransactionForm title='Create Transactions'
                            accounts={this.state.accounts}
                            transactionAccountHandler={this.transactionAccountHandler} />
                    </div>
                    <div className='col p-2 mb-5' style={{ maxHeight: '100px', maxWidth: '25%' }}>
                        <ExpenseAccountsChart expenseAccounts={this.state.expenseAccountsData} month={this.state.month} />
                    </div>
                </div>

                <div className='row '>
                    <div className='col'>
                    <AccountsList accounts={this.state.accounts.slice(0, 5)}
                        transactionAccountHandler={this.transactionAccountHandler}
                        accountIdHandler={this.accountIdHandler} />
                    </div>
                    <div className='col'>
                    <AccountsForm title='Create Accounts' accountHandler={this.transactionAccountHandler} />
                    </div>
                    <div className='col p-2 mb-5' style={{ maxHeight: '100px', maxWidth: '25%' }}>
                        <CashAccountsChart accounts={this.state.accounts} />
                    </div>
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
                                    transactionId={this.state.transactionId}
                                    accounts={this.state.accounts}
                                    transactionAccountHandler={this.transactionAccountHandler} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="aModal" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLongTitle">Edit Account</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AccountsForm
                                    accountId={this.state.accountId}
                                    accountHandler={this.transactionAccountHandler} />
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

export default Home;