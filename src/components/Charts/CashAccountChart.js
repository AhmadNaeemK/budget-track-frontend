import React from 'react'

import { Pie } from 'react-chartjs-2'

import { getRandomColor } from './Utils/chartUtils'


class CashAccountsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cashAccountData: {}
        }
    }

    static getDerivedStateFromProps(props, state) {

        function getCashAccountsData(accounts) {
            const cashAccounts = accounts.filter(account => account.category[0] === 1);
            const data = {
                labels: cashAccounts.map(account => account.title),
                datasets: [
                    {
                        label: 'Cash Accounts',
                        data: cashAccounts.map(account => account.balance),
                        backgroundColor: [...new Array(cashAccounts.length)].map(() => getRandomColor()),
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
                <Pie
                    data={this.state.cashAccountData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cash Accounts',
                                fontSize: 100,
                            },
                            legend: {
                                position: 'bottom'
                            }
                        },
                    }}
                />
            </>
        )
    }

}

export default CashAccountsChart;