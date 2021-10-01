import React from 'react'
import API from '../API';

import AccountsForm from './Accounts/AccountsForm';

class UserOnBoarding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            accountId: null,
            accounts: []
        }
    }

    componentDidMount() {
        (async () => {
            const accounts = await API.fetchCashAccountList();
            this.setState({accounts: accounts,  accountId: accounts[0].id });
        })().then(() => {this.setState({isLoaded: true})});
    }

    onSuccess() {
        window.location.href = '/home'
    }

    render() {
        return (
            <div className='container-fluid p-2'>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='col-5'>
                        <h1>Add How Much Money You Have</h1>
                        <div>
                            <AccountsForm
                                accountId={this.state.accountId}
                                accountHandler={this.onSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserOnBoarding;