import React from 'react';

import API from '../API';

import AccountsForm from './Accounts/AccountsForm';
import AccountsList from './Accounts/AccountsList';

class AllAccounts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            accounts: [],
            accountId: null,
            budget_limit: 0,
        }
    }

    accountIdHandler = (a) => {
        this.setState({
            accountId: a
        })
    }

    accountHandler = (acc) => {
        this.setState({
            accounts: acc
        })
    }

    transactionAccountHandler = (type, transaction, acc) => {
        this.setState({
            accounts: acc
        })
    }


    componentDidMount() {
        (async () => {
            const accounts = await API.fetchCashAccountList();
            this.setState({ accounts: accounts });
        })().then(() => {this.setState({isLoaded: true})});
    }

    render() {
        return (<>
            { this.state.isLoaded && 
                <div className='m-2 p-2'>
                    <div className='d-flex justify-content-center'>

                        {/* <div className='w-20'>
                        <CashAccountsChart accounts={this.state.accounts} />
                        </div>

                        <div className='w-20'>
                        <ExpenseAccountsChart expenseAccounts={this.state.expenseAccountsData} month={monthNames[this.state.month - 1]} />
                        </div> */}

                        <AccountsForm className='w-50'
                            title='Create Account' accountHandler={this.accountHandler} />
                    </div>


                    <div className='border rounded border-white p-2 m-2'>
                        <AccountsList
                            accounts={this.state.accounts}
                            transactionAccountHandler={this.tranactionAccountHandler}
                            accountIdHandler={this.accountIdHandler}
                        />
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
                                        accountId={this.state.accountId}
                                        accountHandler={this.accountHandler} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
        )
    }

}

export default AllAccounts;