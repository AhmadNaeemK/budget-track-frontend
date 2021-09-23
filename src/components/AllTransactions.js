import React from 'react'

import API from '../API';

import TransactionForm from './TransactionForm';

import { monthNames } from '../Config';
import TransactionList from './Transactions';
import ExpenseStructureChart from './Charts/ExpenseStructureChart';


class AllTransactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            transactions: [],
            nextURL: null,
            cashAccounts: [],
            transactionCategories: [],
            transaction_edit: null,
            month: new Date().getMonth() + 1,
            categoryExpenseData: []
        }

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
            const cashAccounts = await API.fetchCashAccountList()
            const categoryExpenseData = await API.fetchCategoryExpenseData(this.state.month)
            const transactionCategories = await API.fetchTransactionCategories()
            this.setState({
                transactions: AllTransactions.results, nextURL: AllTransactions.next,
                cashAccounts: cashAccounts, categoryExpenseData: categoryExpenseData,
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
            <div className='p-2 m-2'>
                {this.state.isLoaded &&
                    <>
                        <div className='row m-2'>
                            <div className='col'>
                                <TransactionForm title='Create Transactions'
                                    accounts={this.state.cashAccounts}
                                    categories={this.state.transactionCategories}
                                    transactionAccountHandler={this.transactionHandler} />
                            </div>
                            <div className='col p-2 mb-5' style={{ height: '50%', minWidth: '15%', maxWidth: '20%' }}>
                                <ExpenseStructureChart expenseData={this.state.categoryExpenseData} month={monthNames[this.state.month - 1]} />
                            </div>
                        </div>
                        <div className='row m-2'>
                            <div className='col border rounded border-white p-2 m-2'>
                                <TransactionList transactions={this.state.transactions}
                                    transactionAccountHandler={this.transactionHandler}
                                    cashAccounts={this.state.cashAccounts}
                                    categories={this.state.transactionCategories}
                                    transactionEditHandler={this.transactionEditHandler}
                                    transactionType={this.props.type} />
                                {this.state.nextURL ?
                                    <button className='btn btn-dark w-100' onClick={this.handleLoadMore}><b>Load More</b></button>
                                    : null
                                }

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
                                            transaction={this.state.transaction_edit}
                                            transactionAccountHandler={this.transactionHandler}
                                            categories={this.state.transactionCategories}
                                        />
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

export default AllTransactions