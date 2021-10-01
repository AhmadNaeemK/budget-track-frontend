import React from 'react';

import ExpenseStructureChart from '../../Charts/ExpenseStructureChart';

import { monthNames } from '../../../Config';
import CashAccountsChart from '../../Charts/CashAccountChart';
import BudgetChart from '../../Charts/BudgetChart';

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
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='col-5 p-3'>
                        <h6> Current Balance </h6>
                        <h1>
                            {new Intl.NumberFormat()
                                .format(this.props.cashAccounts[this.state.selectedAccount].balance)}
                        </h1>
                    </div>
                    <div className='col-4'>
                        <select name='selectedAccount' className='form-select' onChange={this.handleAccountChange}>
                            {this.props.cashAccounts.map((account, index) => (
                                <option key={account.id} value={index}>{account.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <div className='col-sm-6'>
                        <ExpenseStructureChart
                            selectedAccount={this.state.selectedAccount}
                            expenseData={this.props.expenseData}
                            month={monthNames[this.props.month - 1]} />
                    </div>

                    <div className='col-sm-6'>
                        <CashAccountsChart
                            selectedAccount={this.state.selectedAccount}
                            cashAccounts={this.props.cashAccounts}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <BudgetChart
                        selectedAccount={this.state.selectedAccount}
                        accounts={this.props.cashAccounts}
                        month={monthNames[this.props.month - 1]}
                    />
                </div>

            </>
        )
    }
}

export default AccountDataCharts;