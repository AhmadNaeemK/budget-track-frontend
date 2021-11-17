import React from 'react'

import { Pie } from 'react-chartjs-2'

import { categoryColor } from './Utils/chartUtils'


class ExpenseStructureChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expenseCategoryData: {}
        }
    }

    static getDerivedStateFromProps (props,state) {
        function getExpenseAccountsData(expenseData) {
            const data = {
                labels: expenseData.map(category => category[0]),
                datasets: [
                    {
                        label: 'Expense Structure',
                        data: expenseData.map(category => category[1]),
                        backgroundColor: expenseData.map(category => categoryColor[category[0]]),
                    }
                ],
            }
            return data;
        }

        return ({
            expenseCategoryData: getExpenseAccountsData(
                props.expenseData[props.selectedAccount.title]
            )
        })
    }

    render() {
        return (
            <> 
                <Pie
                    data={this.state.expenseCategoryData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: `Expense Structure for ${this.props.month}`,
                                fontSize: 100,
                            },
                            legend: {
                                display: false,
                                position: 'bottom'
                            }
                        },
                    }}
                />
            </>
        )
    }

}

export default ExpenseStructureChart;