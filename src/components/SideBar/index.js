import React from 'react';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//redux
import { connect } from 'react-redux'
import API from '../../API';
import ModalComponent from '../Modals';

//svgs
import { ReactComponent as AccountsIcon } from '../../svg_images/Accounts.svg'
import { ReactComponent as SplitExpensesIcon } from '../../svg_images/SplitExpenses.svg'
import { ReactComponent as ExpenseIcon } from '../../svg_images/expense.svg'
import { ReactComponent as IncomeIcon } from '../../svg_images/income.svg'
import { ReactComponent as ScheduledTransactionIcon } from '../../svg_images/calendar.svg'
import { ReactComponent as FriendsIcon } from '../../svg_images/friends.svg'

class DownloadReportForm extends React.Component {
    constructor(props) {
        super(props);
        const report_types = ['csv',]
        this.intitial_state = {
            from_date: '',
            to_date: '',
            report_type: report_types[0]
        }
        this.state = this.intitial_state
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        API.downloadTransactionReport(this.state);
        this.setState(this.intitial_state)
    }

    render() {
        return (
            <form>

                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='from_date'>From</label>
                            <input className='form-control' value={this.state.from_date} type='date' name='from_date' onChange={this.handleChange} placeholder="From Date" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='to_Date'>To</label>
                            <input className='form-control' value={this.state.t0_date} type='date' name='to_date' onChange={this.handleChange} placeholder="To Date" />
                        </div>
                    </div>
                </div>

                <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit} data-bs-dismiss='modal'>
                    Download
                </button>

            </form>
        )
    }
}


class SideBarComponent extends React.Component {

    render() {
        console.log()
        return (
            <>
                {this.props.isLoggedIn &&
                    <div className="col bg-dark sidebar">
                        <div className="d-flex flex-column flex-shrink-0 text-white bg-dark sticky-top">
                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className='nav-link text-white d-flex' activeClassName='active primaryBtn'>
                                        <i className='fa fa-home sidebar-icon' />
                                        <span> Home </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/accounts" className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <AccountsIcon className='sidebar-icon' />
                                        <span> Accounts </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/splitExpenses' className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <SplitExpensesIcon className='sidebar-icon' />
                                        <span> Splits </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/expenses' className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <ExpenseIcon className='sidebar-icon' />
                                        <span>Expenses</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/incomes' className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <IncomeIcon className='sidebar-icon' />
                                        <span> Incomes </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/scheduledTransactions' className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <ScheduledTransactionIcon className='sidebar-icon' />
                                        <span> Scheduled </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/friends' className='nav-link text-white d-flex' activeClassName='nav-link active'>
                                        <FriendsIcon className='sidebar-icon' />
                                        <span> Friends </span>
                                    </NavLink>
                                </li>
                                <hr/>
                                <li className='download-report'>
                                    <button className='btn primaryBtn' data-bs-toggle='modal' data-bs-target='#download-report'>
                                        <i className='fa fa-arrow-down' />
                                        <span> Download Report </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <ModalComponent
                    id='download-report'
                    title='Download Transaction Report'
                    modalBody={<DownloadReportForm />}
                />
            </>
        )
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.user.isLoggedIn
    })
}

export default connect(mapStateToProps)(SideBarComponent);