import React from 'react'

import {Pie} from 'react-chartjs-2'

import { getRandomColor } from './Utils/chartUtils'


class ExpenseAccountsChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expenseAccountData : {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        
        function getExpenseAccountsData(accounts) {
            const expenseAccounts = accounts.filter( account => !['Cash', 'Salary'].includes(account.category));
            const data = {
                labels: expenseAccounts.map(account => account.title),
                datasets: [
                    {
                        label: 'Expense Accounts',
                        data: expenseAccounts.map(account => account.balance),
                        backgroundColor: [...new Array(expenseAccounts.length)].map(() => getRandomColor()), 
                    }
                ],
            }
            return data;
        }
        return {expenseAccountData: getExpenseAccountsData(props.accounts) };
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
                        text:'Expense Accounts',
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