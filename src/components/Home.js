import React from 'react'

import TransactionForm from './Transactions/TransactionForm';
import AccountsForm from './Accounts/AccountsForm'
import ModalComponent from './Modals'

import { Link } from 'react-router-dom'

import API from '../API';

import { CASH_ACCOUNT_LIST_URL } from '../Config';
import AccountDataCharts from './Accounts/AccountsData/AccountDataCharts';
import MonthlyTransactionChart from './Charts&Tables/MonthlyTransactionChart';
import ScheduleTransactionForm from './Transactions/ScheduleTransactionForm/index.js';
import ExpenseList from './Transactions/TransactionsList/expenseList';
import MaxSplitData from './SplitExpenseData/maxSplitData';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        props.getAccounts();
        props.getTransactionCategories();
        this.state = {
            isLoaded: false,
            transaction_edit: null,
            accountId: null,
            month: new Date().getMonth() + 1,
            categoryExpenseData: [],
            monthlyTransactionChartData: {},
        }
    }

    fetchData = async () => {
        const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month);
        const monthlyTransactionChartData = await API.fetchMonthlyTransactionChartData()
        this.setState({
            categoryExpenseData: categoryExpenseData,
            monthlyTransactionChartData: monthlyTransactionChartData,
        })
    }

    async componentDidUpdate(prevProps){
        if (prevProps.accounts !== this.props.accounts) {
            this.fetchData().then(() => {
                this.setState({ isLoaded: true })
            })
        }
    }

    render() {
        return (
            <div className='container mt-2'>

                {this.state.isLoaded &&
                    <>
                        <div className='row'>
                            <div className='col-lg-7 col-12'>
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
                                            <h6 className='mr-2'>See More </h6>
                                            <i className='fas fa-long-arrow-alt-up ml-4'
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

                            <div className='col-lg-5 col-12'>
                                <div className='p-2 m-2'>
                                    <div className='row'>
                                        <div className='col m-2'>
                                            <button className='btn primaryBtn'
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
                                                    />
                                                }
                                            />
                                        </div>

                                        <div className='col m-2'>
                                            <button className='btn primaryBtn'
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
                                                        transactionAccountHandler={() => {}}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className='col m-2'>
                                            <button
                                                className='btn primaryBtn'
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
                                                        scheduledTransactionHandler={() => {}}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='border rounded border-white p-2 m-2'>
                                    <AccountDataCharts
                                        month={this.state.month}
                                        expenseData={this.state.categoryExpenseData}
                                    />
                                </div>
                                <div className='border rounded border-white p-2 m-2'>
                                    <div className='d-flex align-items-center justify-content-between px-2'>
                                        <h3> Split Expenses </h3>
                                        <Link className='d-flex m-2' to='/splitExpenses' style={{ textDecoration: 'none', color: 'white' }}>
                                            <h6 className='mr-2'>See More </h6>
                                            <i className='fas fa-long-arrow-alt-up ml-4'
                                                style={{
                                                    transform: 'rotate(45deg)',
                                                    marginInlineStart: '5px',
                                                    fontWeight: '1rem'
                                                }}
                                            />
                                        </Link>
                                    </div>
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

const createGetAccountsAction = (accounts) => (
    {
        type: 'account/getAccounts',
        payload: accounts
    }
)

const createGetTransactionCategoriesAction = (categories) => ({
    type: 'transactionCategories/getCategories',
    payload: categories
})

const mapDispatchToProps = (dispatch) => ({

    getAccounts: () => {
        API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20').then(
            (accounts) => {
                dispatch(createGetAccountsAction(accounts.results))
            }
        )
    },
    getTransactionCategories: () => {
        API.fetchTransactionCategories().then(categories => {
            dispatch(createGetTransactionCategoriesAction(categories))
        })
    }


})

const mapStateToProps = (state) => ({
    accounts: state.account.accounts,
    transactionCategories: state.transactionCategories.categories
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);