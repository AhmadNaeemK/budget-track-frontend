import React from 'react'

import {Pie} from 'react-chartjs-2'

import { getRandomColor } from './Utils/chartUtils'


class ExpenseAccountsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expenseAccountData : []
        }
    }

    static getDerivedStateFromProps (props, state) {
        function getExpenseAccountsData(expenseAccounts) {
            const data = {
                labels: expenseAccounts.map(account => account.title),
                datasets: [
                    {
                        label: 'Expense Accounts',
                        data:  expenseAccounts.map(account => account.debit),
                        backgroundColor: [...new Array( expenseAccounts.length)].map(() => getRandomColor()), 
                    }
                ],
            }
            return data;
        }
        return {expenseAccountData: getExpenseAccountsData(props.expenseAccounts) };
      }

    render() {
        return (
            <>
            <Pie
                data={this.state.expenseAccountData}
                options={{
                    plugins:{
                        title:{
                        display:true,
                        text:`Expense Accounts for month ${this.props.month}`,
                        fontSize:100,
                        },
                        legend:{
                            position:'bottom'
                        }
                    },
                }}
            />
            </>
        )
    } 

}

export default ExpenseAccountsChart;