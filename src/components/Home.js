import React from 'react'
import { useState, useEffect } from 'react';

import TransactionList from './Transactions';

import TransactionForm from './TransactionForm';

import API from '../API';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: [],
            loggedIn: false,
            accounts: [],
            transactionId: null,
        }
    }

    transactionHandler(t){
        this.setState({
            transactions: t
        })
    }

    transactionIdHandler(t){
        this.setState({
            transactionId: t
        })
    }

    componentDidMount() {
        this.setState({loggedIn : localStorage.getItem('userid') ? true: false});
        const fetchThings= async () => {
            const transactions = await API.fetchTransactions(false);
            this.setState({transactions: transactions})

            const accounts = await API.fetchAccount(false,true);
            this.setState({accounts: accounts})
        }
        fetchThings()
    }

    componentDidUpdate() {
        API.fetchToken()
    }

    render () {
        return (
            <div className='container-fluid m-2 p-2'>
            <div className=' row display-flex '>
                <TransactionList transactions = {this.state.transactions} 
                                transactionHandler ={this.transactionHandler.bind(this)}
                                transactionIdHandler ={this.transactionIdHandler.bind(this)} />
                <TransactionForm title='Create Transactions' 
                                accounts= {this.state.accounts} 
                                transactions = {this.state.transactions} 
                                transactionHandler ={this.transactionHandler.bind(this)}/>
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
                        transactionId= {this.state.transactionId}
                        accounts= {this.state.accounts} 
                        transactions = {this.state.transactions} 
                        transactionHandler ={this.transactionHandler.bind(this)}/>
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