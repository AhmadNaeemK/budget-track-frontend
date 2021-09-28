import React from 'react'

import { Pie } from 'react-chartjs-2'


class CashAccountsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAccount: 0,
            cashAccountData: {}
        }
    }

    static getDerivedStateFromProps(props, state) {

        function getCashAccountsData(account) {
            const data = {
                labels: ['balance', 'expense'],
                datasets: [
                    {
                        label: account.title,
                        data: [account.balance, account.expenses],
                        backgroundColor: ['#a4a4a4', '#151515'],
                    }
                ],
            }
            return data;
        }
        return { cashAccountData: getCashAccountsData(props.accounts[state.selectedAccount]) };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <Pie
                    data={this.state.cashAccountData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Account Balance vs Expense',
                                fontSize: 100,
                            },
                            legend: {
                                position: 'bottom'
                            }
                        },
                    }}
                />
                <div className='d-flex justify-content-center'>
                    <select name='selectedAccount' className='custom-select col-3' onChange={this.handleChange}>
                        {this.props.accounts.map( (account, index) => (
                            <option key={index} value={index}>{account.title}</option>
                        )) }
                    </select>
                </div>
            </>
        )
    }

}

export default CashAccountsChart;