import React from 'react'
import { Redirect } from 'react-router-dom';

import API from '../API';
import { CASH_ACCOUNT_LIST_URL } from '../Config';
import AccountsForm from './Accounts/AccountsForm';

class UserOnBoarding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            accountId: null,
            accounts: [],
            requestSuccess: false
        }
    }

    componentDidMount() {
        (async () => {
            const accounts = await API.fetchCashAccountList(CASH_ACCOUNT_LIST_URL + '?page_size=20')
            this.setState({ accounts: accounts.results });
        })().then(() => { this.setState({ isLoaded: true }) });
    }

    isResultSuccesful = (successResult) => {
        this.setState({
            requestSuccess: successResult
        })
    }

    render() {
        if (this.state.requestSuccess) {
            return (
                <Redirect to='/home' />
            )
        }
        else {
            return (
                <div className='container-fluid p-2'>
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='col-5'>
                            <h1>Add How Much Money You Have</h1>
                            <div>
                                <AccountsForm
                                    account_edit={this.state.accounts[0]}
                                    accountHandler={this.onSuccess}
                                    isResultSuccesful={this.isResultSuccesful}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default UserOnBoarding;
