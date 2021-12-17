import React from 'react'

import { Link } from 'react-router-dom';
import Logout from '../User/Logout'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NOTIFICATION_SOCKET_URL } from '../../Config';

//redux
import { connect } from 'react-redux';


class UserDisplayPic extends React.Component {

    render() {
        return (
            <div type='button' data-bs-toggle='dropdown'>
                {
                    this.props.pic_url ?
                        <img className='nav-item display-pic' src={this.props.pic_url} alt='display_pic' /> :
                        <i className='fa fa-user-circle-o fa-3x' />
                }
            </div>
        )
    }

}

class NavBar extends React.Component {

    loggedOut = () => {
        this.props.handleLogout(false, null);
        if (this.notificationSocket) {
            this.notificationSocket.close();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.notificationSocket) {
            this.notificationSocket.close();
        }
        if (this.props !== prevProps && this.props.isLoggedIn) {

            this.notificationSocket = new WebSocket(
                NOTIFICATION_SOCKET_URL + this.props.user.id
            );
            this.notificationSocket.onmessage = function (event) {
                const notification = JSON.parse(event.data).notification;
                toast(
                    notification,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
            }
        }
    }

    render() {
        return (
            <>
                <nav className='navbar navbar-dark bg-dark'>
                    {!this.props.isLoggedIn ?
                        (<div className='container-fluid'>
                            <Link className='text-white text-decoration-none' to='/'><h2>Budget Tracker</h2></Link>
                        </div>)
                        :
                        (
                            <div className='container-fluid px-0'>
                                <div className='d-flex align-items-center justify-content-center mt-3'>
                                    <Link className='text-white text-decoration-none' to='/home'>
                                        <h2>Budget Track</h2>
                                    </Link>
                                </div>
                                <div className='row align-items-center m-2'>
                                    <div className='col'>
                                        <p className='text-nowrap m-0'>{this.props.user.fullname}</p>
                                    </div>
                                    <div className='col'>
                                        <div className='dropdown'>
                                            <UserDisplayPic pic_url={this.props.user.display_picture} />
                                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                                <li>
                                                    <Link style={{ textDecoration: 'none' }} to={'/friendRequests'}> <p className="dropdown-item">Friend Requests</p> </Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link style={{ textDecoration: 'none' }} to={'/friends'}> <p className="dropdown-item">Friends</p> </Link> </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link style={{ textDecoration: 'none' }} to={'/profile'}> <p className="dropdown-item">Profile</p> </Link> </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <div className='dropdown-item'>
                                                        <Logout
                                                            loggedOut={this.loggedOut}
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </nav>
                <ToastContainer
                    theme='dark'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user_props
    })
}

export default connect(mapStateToProps)(NavBar);
