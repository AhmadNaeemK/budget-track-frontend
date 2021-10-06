import React from 'react';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class SideBarComponent extends React.Component {



    render() {
        console.log()
        return (
            <>
                {this.props.isLoggedIn &&
                    <div class="col-auto col-sm-1 col-md-3 col-xl-2 bg-dark" style={{ minHeight: '100vh' }}>
                        <div className="d-flex flex-column flex-shrink-0 text-white bg-dark sticky-top">
                            <Link className='m-2' style={{ textDecoration: 'none', color: 'white' }} to={this.props.isLoggedIn ? '/home' : '/'}>
                                <h1>Budget Track</h1>
                            </Link>
                            <hr />
                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className='nav-link text-white' activeClassName='nav-link active'>
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
                            <div class="dropdown pb-4 mt-1100">
                                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    More option
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                    <li><a class="dropdown-item" href="#">New project...</a></li>
                                    <li><a class="dropdown-item" href="#">Settings</a></li>
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

}

export default SideBarComponent;