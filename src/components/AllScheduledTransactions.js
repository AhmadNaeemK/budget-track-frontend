import React from 'react'

import API from '../API';
import { CASH_ACCOUNT_LIST_URL } from '../Config';

import ModalComponent from './Modals';
import ScheduleTransactionForm from './Transactions/ScheduleTransactionForm/index.js';
import ScheduledTransactionList from './Transactions/ScheduledTransactionList/scheduledTransactionList';




class AllScheduledTransactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            categories: [],
            cashAccounts: []
        }
    }

    componentDidMount() {
        (async () => {
            const cashAccounts = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20')
            const transactionCategories = await API.fetchTransactionCategories()
            this.setState({
                cashAccounts: cashAccounts.results,
                categories: transactionCategories
            })
        })().then(() => { this.setState({ isLoaded: true }) });
    }

    acceptChildMethodsForUpdate = (updateData, getData) => {
        this.updateData = updateData
        this.getData = getData
    }

    scheduledTransactionHandler = (scheduledTransaction) => {
        const data = this.getData();
        data.push(scheduledTransaction);
        this.updateData(data);
    }

    render() {
        return (
            <div className='container mt-3'>
                {
                    this.state.isLoaded &&
                    <>
                        <div className='d-flex mb-3'>
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
                                        accounts={this.state.cashAccounts}
                                        categories={this.state.categories}
                                        scheduledTransactionHandler={this.scheduledTransactionHandler}
                                    />
                                }
                            />
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='d-flex justify-content-start m-4'>
                                    <h2>Scheduled Transaction</h2>
                                </div>
                                <ScheduledTransactionList
                                    categories={this.state.categories}
                                    setMethods={this.acceptChildMethodsForUpdate}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default AllScheduledTransactions;