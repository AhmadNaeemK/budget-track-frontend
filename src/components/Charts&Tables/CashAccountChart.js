import React from 'react'

import { Pie } from 'react-chartjs-2'


class CashAccountsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        return { cashAccountData: getCashAccountsData(props.selectedAccount) };
    }

    render() {
        return (
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
        )
    }

}

export default CashAccountsChart;