import React from 'react'

import TransactionForm from './Transactions/TransactionForm';
import AccountsForm from './Accounts/AccountsForm'
import ModalComponent from './Modals'

import { Link } from 'react-router-dom'

import API from '../API';

import { CASH_ACCOUNT_LIST_URL, EXPENSE_LIST_URL } from '../Config';
import AccountDataCharts from './Accounts/AccountsData/AccountDataCharts';
import MonthlyTransactionChart from './Charts&Tables/MonthlyTransactionChart';
import ScheduleTransactionForm from './Transactions/ScheduleTransactionForm.js';
import ExpenseList from './Transactions/TransactionsList/expenseList';
import MaxSplitData from './SplitExpenseData/maxSplitData';

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
            userCreatedSplits: [],
            userPayableSplits: [],
            monthlyTransactionChartData: {},
            page_size: 5,
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
        if (type === 'expenses') {
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

    splitTransactionHandler = async () => {
        const newSplits = await API.fetchSplitTransactionList(true);
        this.setState({
            userCreatedSplits: newSplits,
        })
    }

    accountHandler = async () => {
        const newCategoryData = await API.fetchCategoryExpenseData(this.state.month);
        const acc = await API.fetchCashAccountList()
        this.setState({
            cashAccounts: acc,
            categoryExpenseData: newCategoryData
        })
    }

    componentDidMount() {
        const fetchThings = async () => {
            const month = new Date().getMonth() + 1
            const paginationParams = `?month=${month}&page_size=${this.state.page_size}`
            const expenses = await API.fetchExpenseList(month, EXPENSE_LIST_URL + paginationParams);
            const cashAccountList = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20');
            const transactionCategories = await API.fetchTransactionCategories();
            const categoryExpenseData = await API.fetchCategoryExpenseData(month);
            const monthlyTransactionChartData = await API.fetchMonthlyTransactionChartData()
            this.setState({
                expenses: expenses, cashAccounts: cashAccountList.results,
                transactionCategories: transactionCategories,
                categoryExpenseData: categoryExpenseData,
                monthlyTransactionChartData: monthlyTransactionChartData,
            })
        }
        fetchThings().then(() => {
            this.setState({ isLoaded: true })
        })
    }

    render() {
        return (
            <div className='container mt-2'>

                {this.state.isLoaded &&
                    <>
                        <div className='row'>
                            <div className='col-sm-7 col-12'>
                                <div className='row p-2 m-2'>
                                    <div className='col'>
                                        <MonthlyTransactionChart
                                            monthlyData={this.state.monthlyTransactionChartData}
                                        />
                                    </div>
                                </div>

                                <div className='row border rounded border-white p-2 m-2'>
                                    <div className='d-flex align-items-center justify-content-between px-2'>
                                        <h2> Recent Expenses </h2>
                                        <Link className='d-flex m-2' to='/expenses' style={{ textDecoration: 'none', color: 'white' }}>
                                            <h3 className='mr-2'>See More </h3>
                                            <i className='fas fa-long-arrow-alt-up fa-2x ml-4'
                                                style={{
                                                    transform: 'rotate(45deg)',
                                                    marginInlineStart: '5px',
                                                    fontWeight: '1rem'
                                                }}
                                            />
                                        </Link>
                                    </div>

                                    <ExpenseList
                                        paginated={false}
                                        searchAble={false}
                                        month={this.state.month}
                                    />
                                </div>

                            </div>

                            <div className='col-sm-5 col-12'>
                                <div className='border rounded border-white p-2 m-2'>
                                    <div className='row'>
                                        <div className='col'>
                                            <button className='btn btn-outline-primary'
                                                data-bs-toggle='modal'
                                                data-bs-target={`#create-account`}>
                                                Create Account
                                            </button>

                                            <ModalComponent
                                                id='create-account'
                                                title='Create Account'
                                                modalBody={
                                                    <AccountsForm
                                                        type='creation'
                                                        accountId={this.state.accountId}
                                                        accountHandler={this.accountHandler} />
                                                }
                                            />
                                        </div>

                                        <div className='col'>
                                            <button className='btn btn-outline-primary'
                                                data-bs-toggle='modal'
                                                data-bs-target={`#create-transaction`}
                                            >
                                                Create Transaction
                                            </button>
                                            <ModalComponent
                                                id='create-transaction'
                                                title='Create Transaction'
                                                modalBody={
                                                    <TransactionForm
                                                        type='creation'
                                                        transaction={this.state.transaction_edit}
                                                        accounts={this.state.cashAccounts}
                                                        transactionAccountHandler={this.transactionAccountHandler}
                                                        categories={this.state.transactionCategories}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className='col'>
                                            <button
                                                className='btn btn-outline-primary'
                                                data-bs-toggle='modal'
                                                data-bs-target={`#schedule-transaction`}
                                            >
                                                Schedule Transaction
                                            </button>
                                            <ModalComponent
                                                id='schedule-transaction'
                                                title='Schedule Transaction'
                                                modalBody={
                                                    <ScheduleTransactionForm
                                                        accounts={this.state.cashAccounts}
                                                        categories={this.state.transactionCategories}
                                                        scheduledTransactionHandler={() => { console.log("Scheduled") }}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='border rounded border-white p-2 m-2'>
                                    <AccountDataCharts
                                        cashAccounts={this.state.cashAccounts}
                                        month={this.state.month}
                                        expenseData={this.state.categoryExpenseData}
                                    />
                                </div>
                                <div className='border rounded border-white p-2 m-2'>
                                    <MaxSplitData />
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