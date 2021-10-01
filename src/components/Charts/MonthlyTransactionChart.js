import React from 'react'
import { Line } from 'react-chartjs-2';
import { monthNames } from '../../Config';
import { getRandomColor } from './Utils/chartUtils';

import chroma from 'chroma-js';


class MonthlyTransactionChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'expense',
            monthlyTransactionData: []
        }
    }

    static getDerivedStateFromProps(props, state) {

        function getmonthlyTransactionData(monthlyData) {
            const data = {
                labels: monthNames,
                datasets: [
                    {
                        label: state.selectedType,
                        data: monthlyData,
                        backgroundColor: ['#3377aa'],
                        borderColor: ['#ffffff'],
                        borderWidth: 2,
                        radius: 5,
                        tension: 0.5,
                    }
                ],
            }
            return data;
        }
        return { monthlyTransactionData: getmonthlyTransactionData(props.monthlyData[state.selectedType]) };
    }

    render() {
        return (
            <>
                <div className='d-flex align-items-center justify-content-between px-2'>
                    <h2> Statistics </h2>
                    <div className='form-check' onChange={event => this.setState({
                        selectedType: event.target.value
                    })}>
                        <div class="form-check form-check-inline">
                            <input class="btn-check" type="radio" name="income" id="income"
                                value="income" checked={this.state.selectedType === 'income'} />
                            <label class="btn btn-outline-secondary" htmlFor="income">Income</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="btn-check" type="radio" name="expense" id="expense" value="expense"
                                checked={this.state.selectedType === 'expense'}
                            />
                            <label class="btn btn-outline-secondary" htmlFor="expense">Expense</label>
                        </div>
                    </div>
                </div>

                <Line
                    data={this.state.monthlyTransactionData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: `${this.state.selectedType} for ${new Date().getFullYear()}`,
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

export default MonthlyTransactionChart;