import React from 'react'

import { Bar } from 'react-chartjs-2'


class BudgetChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cashAccountData: []
        }
    }

    static getDerivedStateFromProps(props, state) {

        function getCashAccountsData(account) {
            const data = {
                labels: ['balance', 'budget' ,'expense'],
                datasets: [
                    {
                        label: account.title,
                        data: [account.balance, account.limit ,account.expenses],
                        backgroundColor: ['#64c93c', '#c93c41', '#3cc9aa'],
                    }
                ],
            }
            return data;
        }
        return { cashAccountData: getCashAccountsData(props.accounts[props.selectedAccount]) };
    }

    render() {
        return (
            <>
                <Bar
                    data={this.state.cashAccountData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: `Budgets for ${this.props.month}`,
                                fontSize: 100,
                            },
                            legend: {
                                position: 'top'
                            }
                        },
                    }}
                />
            </>
        )
    }
}

export default BudgetChart;