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

        function getCashAccountsData(accounts) {
            const data = {
                labels: accounts.map(account => account.title),
                datasets: [
                    {
                        label: 'Balance',
                        data: accounts.map(account => { return {x: account.title, balance: account.balance, budget: account.limit, expense: account.expenses } }),
                        backgroundColor: ['#64c93c'],
                        parsing: {
                            yAxisKey: 'balance'
                        }
                    }, {
                        label: 'Budget',
                        data: accounts.map(account => { return {x: account.title, balance: account.balance, budget: account.limit, expense: account.expenses } }),
                        backgroundColor: ['#c93c41'],
                        parsing: {
                            yAxisKey: 'budget'
                        }
                    }, {
                        label: 'Expense',
                        data: accounts.map(account => { return {x: account.title, balance: account.balance, budget: account.limit, expense: account.expenses } }),
                        backgroundColor: ['#3cc9aa'],
                        parsing: {
                            yAxisKey: 'expense'
                        }
                    }
                ],
            }
            return data;
        }
        return { cashAccountData: getCashAccountsData(props.accounts) };
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