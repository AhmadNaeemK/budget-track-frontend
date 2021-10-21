import React from 'react';

import ExpenseStructureChart from '../../Charts&Tables/ExpenseStructureChart';

import { monthNames } from '../../../Config';
import CashAccountsChart from '../../Charts&Tables/CashAccountChart';

class AccountDataCharts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: 0,
        }
    }

    handleAccountChange = (event) => {
        this.setState({
            selectedAccount: event.target.value
        })
    }

    componentDidMount() {
        if ( !this.props.cashAccounts['selectedAccount']){
            this.setState({
                selectedAccount: 0
            })
        }
    }

    render() {
        return (
            <>
                <div className='row justify-content-between align-items-center'>
                    <div className=' col p-3'>
                        <h6> Current Balance </h6>
                        <h1>
                            {new Intl.NumberFormat()
                                .format(this.props.cashAccounts[this.state.selectedAccount].balance)}
                        </h1>
                    </div>
                    <div className='col'>
                        <select name='selectedAccount' className='form-select' onChange={this.handleAccountChange}>
                            {this.props.cashAccounts.map((account, index) => (
                                <option key={account.id} value={index}>{account.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr />
                <div className='row justify-content-between align-items-center mb-5'>
                    <div className='col-lg-6'>
                        <ExpenseStructureChart
                            selectedAccount={this.state.selectedAccount}
                            expenseData={this.props.expenseData}
                            month={monthNames[this.props.month - 1]} />
                    </div>

                    <div className='col-lg-6'>
                        <CashAccountsChart
                            selectedAccount={this.state.selectedAccount}
                            cashAccounts={this.props.cashAccounts}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default AccountDataCharts;