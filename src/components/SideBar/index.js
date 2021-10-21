import React from 'react';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class SideBarComponent extends React.Component {

    render() {
        console.log()
        return (
            <>
                {this.props.isLoggedIn &&
                    <div className="col-auto col-sm-3 col-md-2 col-xl-2 bg-dark" style={{ minHeight: '100vh' }}>
                        <div className="d-flex flex-column flex-shrink-0 text-white bg-dark sticky-top">
                            <div className='d-flex align-items-center justify-content-center mt-3'>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={this.props.isLoggedIn ? '/home' : '/'}>
                                    <h1>Budget Track</h1>
                                </Link>
                            </div>
                            <hr />
                            <ul className="nav nav-pills flex-column mb-auto">
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
                        </div>
                    </div>
                }
            </>
        )
    }

}

export default SideBarComponent;