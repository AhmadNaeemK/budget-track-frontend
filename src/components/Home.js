import React from 'react'

import TransactionList from './Transactions';
import TransactionForm from './TransactionForm';
import AccountsList from './Accounts'
import AccountsForm from './AccountsForm'


import API from '../API';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactions: [],
            loggedIn: false,
            accounts: [],
            transactionId: null,
            accountId: null,
        }
    }

    transactionAccountHandler = (t, a)=> {
        this.setState({
            transactions: t,
            accounts: a,
        })
    }

    transactionIdHandler = (t) => {
        this.setState({
            transactionId: t
        })
    }

    accountIdHandler = (a) => {
        this.setState({
            accountId: a
        })
    }

    accountHandler = (a) => {
        this.setState({
            accounts: a
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

            <div className=' row d-flex '>
                <TransactionList transactions = {this.state.transactions} 
                                transactionAccountHandler ={this.transactionAccountHandler}
                                transactionIdHandler ={this.transactionIdHandler} />
                <TransactionForm title='Create Transactions' 
                                accounts= {this.state.accounts} 
                                transactions = {this.state.transactions} 
                                transactionAccountHandler ={this.transactionAccountHandler}/>
            </div>

            <div className='row d-flex'>
                <AccountsList accounts= {this.state.accounts}
                                transactionAccountHandler = {this.transactionAccountHandler}
                                accountIdHandler = {this.accountIdHandler}/>
                <AccountsForm title='Create Accounts' accountHandler={this.accountHandler}/>
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
                        transactionAccountHandler ={this.transactionAccountHandler}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                        accountId= {this.state.accountId}
                        transactionAccountHandler = {this.transactionAccountHandler}/>
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