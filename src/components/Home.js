import React from 'react'

import TransactionList from './Transactions/TransactionsList';
import TransactionForm from './Transactions/TransactionForm';
import AccountsList from './Accounts/AccountsList'
import AccountsForm from './Accounts/AccountsForm'
import ExpenseStructureChart from './Charts/ExpenseStructureChart'
import CashAccountsChart from './Charts/CashAccountChart';
import BudgetChart from './Charts/BudgetChart';
import ScheduleTransactionForm from './Transactions/SplitTransactionForm';
import SplitTransactionList from './Transactions/SplitTransactionList'
import SplitTransactionForm from './Transactions/SplitTransactionForm';
import ModalComponent from './Modals'

import { Link } from 'react-router-dom'

import API from '../API';

import { EXPENSE_LIST_URL, monthNames } from '../Config';
import AccountDataCharts from './Accounts/AccountsData/AccountDataCharts';
import MonthlyTransactionChart from './Charts/MonthlyTransactionChart';

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
        this.setState({ loggedIn: localStorage.getItem('userid') ? true : false });
        const fetchThings = async () => {
            const month = new Date().getMonth() + 1
            const paginationParams = `?month=${month}&page_size=${this.state.page_size}`
            const expenses = await API.fetchExpenseList(month, EXPENSE_LIST_URL + paginationParams);
            const incomes = await API.fetchIncomeList(month);
            const cashAccountList = await API.fetchCashAccountList();
            const transactionCategories = await API.fetchTransactionCategories();
            const categoryExpenseData = await API.fetchCategoryExpenseData(month);
            const scheduledTransactionList = await API.fetchScheduledTransactionList();
            const userCreatedSplits = await API.fetchSplitTransactionList(true)
            const userPayableSplits = await API.fetchSplitTransactionList(false)
            const monthlyTransactionChartData = await API.fetchMonthlyTransactionChartData()
            this.setState({
                expenses: expenses, cashAccounts: cashAccountList,
                transactionCategories: transactionCategories, incomes: incomes,
                categoryExpenseData: categoryExpenseData, Scheduled: scheduledTransactionList,
                userCreatedSplits: userCreatedSplits, userPayableSplits: userPayableSplits,
                monthlyTransactionChartData: monthlyTransactionChartData,
            })
        }
        fetchThings().then(() => {
            this.setState({ isLoaded: true })
        })
    }

    render() {
        return (
            <div className='container-fluid mt-2'>

                {this.state.isLoaded &&
                    <>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-xl-8 col-12'>
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

                                        <TransactionList
                                            transactions={this.state.expenses.results}
                                            transactionAccountHandler={this.transactionAccountHandler}
                                            cashAccounts={this.state.cashAccounts}
                                            categories={this.state.transactionCategories}
                                            transactionEditHandler={this.transactionEditHandler}
                                            transactionType="Expenses" />
                                    </div>

                                </div>

                                <div className='col-xl-4 col-12'>
                                    <div className='border rounded border-white p-2 m-2'>
                                        <AccountDataCharts
                                            cashAccounts={this.state.cashAccounts}
                                            month={this.state.month}
                                            expenseData={this.state.categoryExpenseData}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className='row m-2'>

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

                        {/* <div className='row m-2'>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '25%' }}>
                                <ExpenseStructureChart expenseData={this.state.categoryExpenseData} month={monthNames[this.state.month - 1]} />
                            </div>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '25%' }}>
                                <CashAccountsChart accounts={this.state.cashAccounts} month={monthNames[this.state.month - 1]} />
                            </div>
                            <div className='col p-2 mb-5' style={{ height: '100%', minWidth: '20%', maxWidth: '50%' }}>
                                <BudgetChart accounts={this.state.cashAccounts} month={monthNames[this.state.month - 1]} />
                            </div>
                        </div> */}

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
                        {this.state.Scheduled.length > 0 &&
                            <div className='row m-2'>
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

                        <div className='row m-2'>
                            <div className='col border rounded border-white p-2 m-2'>
                                <SplitTransactionList
                                    splitTransactions={this.state.userCreatedSplits.results}
                                    splitHandler={this.splitTransactionHandler}
                                    splitType='created'
                                    title="Recievable Splits"
                                    categories={this.state.transactionCategories}
                                />
                            </div>
                            <div className='col'>
                                <SplitTransactionForm
                                    categories={this.state.transactionCategories}
                                    splitHandler={this.splitTransactionHandler}
                                />
                            </div>
                        </div>

                        <div className='row m-2'>
                            <div className='col border rounded border-white p-2 m-2'>
                                <SplitTransactionList
                                    splitTransactions={this.state.userPayableSplits.results}
                                    splitHandler={this.splitTransactionHandler}
                                    splitType='payable'
                                    title="Payable Splits"
                                    categories={this.state.transactionCategories}
                                />
                            </div>
                        </div>

                        <ModalComponent
                            id='tModal'
                            title='Edit Transactions'
                            modalBody={
                                <TransactionForm
                                    transaction={this.state.transaction_edit}
                                    transactionAccountHandler={this.transactionAccountHandler}
                                    categories={this.state.transactionCategories}
                                />
                            }
                        />
                        <ModalComponent

                            id='aModal'
                            title='Edit Account'
                            modalBody={
                                <AccountsForm
                                    accountId={this.state.accountId}
                                    accountHandler={this.accountHandler} />
                            }
                        />
                    </>
                }
            </div>
        )
    }
}

export default Home;