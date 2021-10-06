import React from 'react'

import API from '../API';
import { CASH_ACCOUNT_LIST_URL } from '../Config';

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

    static getDerivedStateFromProps(props, state) {
        state['type'] = props.type;
        return state
    }

    handleDelete = async (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteTransactions(transactionId);
        const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month)
        if (res.status === 204) {
            const newTransactions = this.state.transactions.filter(transaction => transaction.id !== transactionId);
            this.setState({ transactions: newTransactions, categoryExpenseData: categoryExpenseData });
        }
    }

    handleEdit = (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        this.setState({ transactionId: transactionId })
    }

    handleMonthChange = (event) => {
        (async () => {
            this.setState({ month: parseInt(await event.target.value) });
            const AllTransactions = await API.fetchTransactions(this.state.month, true);
            const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month)
            this.setState({
                transactions: AllTransactions,
                categoryExpenseData: categoryExpenseData,
            })
        })();
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
            const AllTransactions = this.props.type === "Expenses" ? await API.fetchExpenseList(this.state.month) :
                await API.fetchIncomeList(this.state.month);
            const cashAccounts = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20')
            const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month)
            const transactionCategories = await API.fetchTransactionCategories()
            this.setState({
                transactions: AllTransactions.results, nextURL: AllTransactions.next,
                cashAccounts: cashAccounts.results, categoryExpenseData: categoryExpenseData,
                transactionCategories: transactionCategories
            })
        })().then(() => { this.setState({ isLoaded: true }) });
    }

    handleLoadMore = async () => {
        const moreTransactions = this.props.type === "Expenses" ? await API.fetchExpenseList(this.state.month, this.state.nextURL) :
            await API.fetchIncomeList(this.state.month, this.state.nextURL);
        this.setState({
            transactions: this.state.transactions.concat(moreTransactions.results),
            nextURL: moreTransactions.next,
        });
    }

    render() {
        return (
            <div className='container mt-3'>
                {this.state.isLoaded &&
                    <>
                        <div className='d-flex mb-3'>
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

                        <div className='row'>
                            <div className='col'>
                                {this.props.type === 'expense' ?
                                    <>
                                        <div className='d-flex justify-content-start m-4'>
                                            <h2>Expenses</h2>
                                        </div>
                                        <ExpenseList
                                            paginated={true}
                                            searchAble={true}
                                            month={this.state.month}
                                            transactionCategories={this.state.transactionCategories}
                                            require_buttons={true}
                                        />
                                    </>
                                    :
                                    <>
                                        <div className='d-flex justify-content-start m-4'>
                                            <h2>Income</h2>
                                        </div>
                                        <IncomeList
                                            paginated={true}
                                            searchAble={true}
                                            month={this.state.month}
                                            transactionCategories={this.state.transactionCategories}
                                        />
                                    </>
                                }
                            </div>

                        </div>
                    </>
                }
            </div>
        )
    }

}

export default AllTransactions