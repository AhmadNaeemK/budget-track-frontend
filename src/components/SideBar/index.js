import React from 'react';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//redux
import { connect } from 'react-redux'
import API from '../../API';
import ModalComponent from '../Modals';


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
                    <div className="col-auto col-sm-3 col-md-2 col-xl-2 bg-dark" style={{ minHeight: '100vh' }}>
                        <div className="d-flex flex-column flex-shrink-0 text-white bg-dark sticky-top">
                            <div className='d-flex align-items-center justify-content-center mt-3'>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>
                                    <h1>Budget Track</h1>
                                </Link>
                            </div>
                            <hr />
                            <ul className="nav nav-pills flex-column flex-grow-1 mb-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className='nav-link text-white' activeClassName='active primaryBtn'>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/accounts" className='nav-link text-white' activeClassName='nav-link active'>
                                        Accounts
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/splitExpenses' className='nav-link text-white' activeClassName='nav-link active'>
                                        Split Expense
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/expenses' className='nav-link text-white' activeClassName='nav-link active'>
                                        Expenses
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/incomes' className='nav-link text-white' activeClassName='nav-link active'>
                                        Incomes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/scheduledTransactions' className='nav-link text-white' activeClassName='nav-link active'>
                                        Scheduled Transactions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/friends' className='nav-link text-white' activeClassName='nav-link active'>
                                        Friends
                                    </NavLink>
                                </li>
                            </ul>
                            <hr />
                            <button className='btn primaryBtn' data-bs-toggle='modal' data-bs-target='#download-report'> Download Report </button>
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