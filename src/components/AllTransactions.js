import React from 'react'

import API from '../API';
import { CASH_ACCOUNT_LIST_URL, monthNames } from '../Config';

import TransactionForm from './Transactions/TransactionForm';
import ExpenseList from './Transactions/TransactionsList/expenseList';
import IncomeList from './Transactions/TransactionsList/incomeList';
import ModalComponent from './Modals';


class AllTransactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            month: new Date().getMonth() + 1,
            transactionCategories: [],
            cashAccounts: [],
        }

    }


    handleEdit = (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        this.setState({ transactionId: transactionId })
    }

    transactionHandler = async () => {
        const AllTransactions = this.props.type === "Expenses" ? await API.fetchExpenseList(this.state.month) :
            await API.fetchIncomeList(this.state.month);
        const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month)
        this.setState({
            transactions: AllTransactions.results, nextURL: AllTransactions.next,
            categoryExpenseData: categoryExpenseData
        });
    }

    transactionEditHandler = (t) => {
        this.setState({
            transaction_edit: t
        })
    }

    componentDidMount() {
        (async () => {
            const cashAccounts = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20')
            const transactionCategories = await API.fetchTransactionCategories()
            this.setState({
                cashAccounts: cashAccounts.results,
                transactionCategories: transactionCategories
            })
        })().then(() => { this.setState({ isLoaded: true }) });
    }

    handleMonthChange = (event) => {
        this.setState({ month: event.target.value })
    }

    render() {
        return (
            <div className='container mt-3'>
                {this.state.isLoaded &&
                    <>
                        <div className='d-flex mb-3'>
                            <div>
                                <button
                                    className='btn btn-outline-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target={`#split-transaction`}
                                >
                                    Create Transaction
                                </button>
                                <ModalComponent
                                    id='split-transaction'
                                    title='Split Expense'
                                    modalBody={
                                        <TransactionForm title='Create Transactions'
                                            accounts={this.state.cashAccounts}
                                            categories={this.state.transactionCategories}
                                            type="creation"
                                            transactionAccountHandler={this.transactionHandler} />
                                    }
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className='d-flex justify-content-between m-4'>
                                    {this.props.type === 'expense' ?
                                        <h2>Expenses</h2>
                                        :
                                        <h2>Income</h2>
                                    }
                                    <div className='col-3'>
                                        <select name='month' className='form-select' defaultValue={this.state.month} onChange={this.handleMonthChange}>
                                            {monthNames.map((month, index) => (
                                                <option key={month} value={index + 1}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    {this.props.type === 'expense' ?
                                        <ExpenseList
                                            paginated={true}
                                            searchAble={true}
                                            month={this.state.month}
                                            transactionCategories={this.state.transactionCategories}
                                            require_buttons={true}
                                        />
                                        :
                                        <IncomeList
                                            paginated={true}
                                            searchAble={true}
                                            month={this.state.month}
                                            transactionCategories={this.state.transactionCategories}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

}

export default AllTransactions