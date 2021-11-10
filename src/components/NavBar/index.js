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
                        (<div className='container-fluid mt-2'>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'><h1>Budget Tracker</h1></Link>
                        </div>)
                        :
                        (
                            <div className='container-fluid mt-2'>
                                <div></div>
                                <div className='row align-items-center m-2'>
                                    <div className='col pt-2'>
                                        <p className='text-nowrap'>{this.props.user.fullname}</p>
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
