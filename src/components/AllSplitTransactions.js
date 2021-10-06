import React from 'react'

import ModalComponent from './Modals';
import SplitTransactionForm from './Transactions/SplitTransactionForm'

import API from '../API';
import SplitTransactionList from './Transactions/SplitTransactionList';

class AllSplitTransactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionCategories: []
        }
    }

    componentDidMount = async (s) => {
        const transactionCategories = await API.fetchTransactionCategories()
        this.setState({
            transactionCategories: transactionCategories
        })
    }

    render() {
        return (
            <div className='container mt-3'>
                <div className='d-flex mb-3'>
                    <button
                        className='btn btn-outline-primary'
                        data-bs-toggle='modal'
                        data-bs-target={`#split-transaction`}
                    >
                        Schedule Transaction
                    </button>
                    <ModalComponent
                        id='split-transaction'
                        title='Split Expense'
                        modalBody={
                            <SplitTransactionForm
                                categories={this.state.transactionCategories}
                            />
                        }
                    />
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-start m-4'>
                            <h2>Split Expenses</h2>
                        </div>
                        <SplitTransactionList
                            categories={this.state.transactionCategories}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AllSplitTransactions;