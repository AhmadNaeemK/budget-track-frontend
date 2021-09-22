import React from 'react'

import TransactionList from './Transactions';
import TransactionForm from './TransactionForm';
import AccountsList from './Accounts'
import AccountsForm from './AccountsForm'
import ExpenseStructureChart from './Charts/ExpenseStructureChart'
import CashAccountsChart from './Charts/CashAccountChart';
import BudgetChart from './Charts/BudgetChart';
import ScheduleTransactionForm from './ScheduleTransactionForm.js';

import { monthNames } from '../Config';

import { Link } from 'react-router-dom'


import API from '../API';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            expenses: [],
            incomes: [],
            loggedIn: false,
            cashAccounts: [],
            transactionCategories: [],
            transaction_edit: null,
            accountId: null,
            month: new Date().getMonth() + 1,
            categoryExpenseData: [],
            Scheduled: [],
        }
    }

    // edit forms
    transactionEditHandler = (t) => {
        this.setState({
            transaction_edit: t
        })
    }

    accountIdHandler = (a) => {
        this.setState({
            accountId: a
        })
    }


    transactionAccountHandler = async (type, transaction, acc) => {
        let newTransactions;
        if (type === 'expenses'){
            newTransactions = await API.fetchExpenseList(this.state.month)
        } else if (type === 'incomes') {
            newTransactions = await API.fetchIncomeList(this.state.month);
        } else {
            newTransactions = await API.fetchScheduledTransactionList();
        }

        const newCategoryData = await API.fetchCategoryExpenseData(this.state.month);
        const newCashAccounts = await API.fetchCashAccountList();
        this.setState({
            [type]: newTransactions,
            cashAccounts: newCashAccounts,
            categoryExpenseData: newCategoryData,
        })
    }

    scheduledTransactionHandler = async () => {
        const newTransactions = await API.fetchScheduledTransactionList();
        this.setState({
            Scheduled: newTransactions,
        })
    }

    accountHandler = (acc) => {
        this.setState({
            cashAccounts: acc
        })
    }

    componentDidMount() {
        this.setState({ loggedIn: localStorage.getItem('userid') ? true : false });
        const fetchThings = async () => {
            const month = new Date().getMonth() + 1
            const expenses = await API.fetchExpenseList(month);
            const incomes = await API.fetchIncomeList(month);
            const cashAccountList = await API.fetchCashAccountList();
            const transactionCategories = await API.fetchTransactionCategories();
            const categoryExpenseData = await API.fetchCategoryExpenseData(month);
            const scheduledTransactionList = await API.fetchScheduledTransactionList();
            this.setState({
                expenses: expenses, cashAccounts: cashAccountList,
                transactionCategories: transactionCategories, incomes: incomes,
                categoryExpenseData: categoryExpenseData, Scheduled: scheduledTransactionList,
            })
        }
        fetchThings().then(() => {
            this.setState({ isLoaded: true })
        })
    }




    render() {
        return (
            <div className='container-fluid m-2 p-2'>

                {this.state.isLoaded &&
                    <>
                        <div className='row m-2'>
                            <div className='col border rounded border-white p-2 m-2'>
                                <TransactionList transactions={this.state.expenses.results}
                                    transactionAccountHandler={this.transactionAccountHandler}
                                    cashAccounts={this.state.cashAccounts}
                                    categories={this.state.transactionCategories}
                                    transactionEditHandler={this.transactionEditHandler}
                                    transactionType="Expenses" />
                                <Link to='/expenses'> <button className='btn btn-dark w-100'><b>All Expenses</b></button> </Link>
                            </div>
                            <div className='col border rounded border-white p-2 m-2'>
                                <TransactionList transactions={this.state.incomes.results}
                                    transactionAccountHandler={this.transactionAccountHandler}
                                    cashAccounts={this.state.cashAccounts}
                                    categories={this.state.transactionCategories}
                                    transactionEditHandler={this.transactionEditHandler}
                                    transactionType="Income" />
                                <Link to='/incomes'> <button className='btn btn-dark w-100'><b>All Incomes</b></button> </Link>
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col'>
                                        <TransactionForm title='Create Transactions'
                                            accounts={this.state.cashAccounts}
                                            categories={this.state.transactionCategories}
                                            transactionAccountHandler={this.transactionAccountHandler} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <ScheduleTransactionForm
                                            accounts={this.state.cashAccounts}
                                            categories={this.state.transactionCategories}
                                            scheduledTransactionHandler={this.scheduledTransactionHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row m-2'>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '25%' }}>
                                <ExpenseStructureChart expenseData={this.state.categoryExpenseData} month={monthNames[this.state.month - 1]} />
                            </div>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '25%' }}>
                                <CashAccountsChart accounts={this.state.cashAccounts} month={monthNames[this.state.month - 1]} />
                            </div>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '50%' }}>
                                <BudgetChart accounts={this.state.cashAccounts} month={monthNames[this.state.month - 1]} />
                            </div>
                        </div>

                        <div className='row m-2'>
                            <div className='col border rounded border-white p-2 m-2'>
                                <AccountsList accounts={this.state.cashAccounts}
                                    transactionAccountHandler={this.transactionAccountHandler}
                                    accountIdHandler={this.accountIdHandler} />
                                <Link to='/accounts'> <button className='btn btn-dark w-100'><b>All Accounts</b></button> </Link>
                            </div>
                            <div className='col'>
                                <AccountsForm title='Create Account' accountHandler={this.accountHandler} />
                            </div>
                        </div>
                        {   this.state.Scheduled.length > 0 &&
                            <div className='rom m-2'>
                                <div className='col border rounded border-white p-2 m-2'>
                                    <TransactionList
                                        transactions={this.state.Scheduled}
                                        cashAccounts={this.state.cashAccounts}
                                        categories={this.state.transactionCategories}
                                        transactionAccountHandler={this.scheduledTransactionHandler}
                                        transactionType="Scheduled"
                                    />
                                </div>
                            </div>
                        }

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
                                            transaction={this.state.transaction_edit}
                                            transactionAccountHandler={this.transactionAccountHandler}
                                            categories={this.state.transactionCategories}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                                            accountHandler={this.accountHandler} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default Home;