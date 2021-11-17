import React from 'react';
import { connect } from 'react-redux';

import ExpenseStructureChart from '../../Charts&Tables/ExpenseStructureChart';

import { monthNames } from '../../../Config';
import CashAccountsChart from '../../Charts&Tables/CashAccountChart';

class AccountDataCharts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: props.accounts[0],
        }
    }

    handleAccountChange = (event) => {
        this.setState({
            selectedAccount: this.props.accounts[event.target.value]
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accounts !== this.props.accounts) {
            this.setState({
                selectedAccount: this.props.accounts.find(account => account.title === this.state.selectedAccount.title)
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
                                .format(this.state.selectedAccount.balance)}
                        </h1>
                    </div>
                    <div className='col'>
                        <select name='selectedAccount' className='form-select' onChange={this.handleAccountChange}>
                            {this.props.accounts.map((account, index) => (
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
                        />
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    accounts: state.account.accounts
})

export default connect(mapStateToProps)(AccountDataCharts);