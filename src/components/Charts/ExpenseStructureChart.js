import React from 'react'

import { Pie } from 'react-chartjs-2'

import { categoryColor } from './Utils/chartUtils'


class ExpenseStructureChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAccount:0,
            expenseCategoryData: []
        }
    }

    static getDerivedStateFromProps(props, state) {
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
        return { expenseCategoryData: getExpenseAccountsData(props.expenseData[Object.keys(props.expenseData)[state.selectedAccount]]) };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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
                                position: 'bottom'
                            }
                        },
                    }}
                />
                <div className='d-flex justify-content-center'>
                    <select name='selectedAccount' className='custom-select col-3' onChange={this.handleChange}>
                        {Object.keys(this.props.expenseData).map((account, index) => (
                            <option key={index} value={index}>{account}</option>
                        ))}
                    </select>
                </div>
            </>
        )
    }

}

export default ExpenseStructureChart;