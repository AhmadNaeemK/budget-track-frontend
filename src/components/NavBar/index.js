import React from 'react'

import { Link } from 'react-router-dom';
import Logout from '../User/Logout'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NavBar extends React.Component {

    loggedOut = () => {
        this.props.handleLogout(false, null, null);
        if (this.friendRequestSocket) {
            this.friendRequestSocket.close();
        }
    }

    componentDidMount() {
        this.setState({
            username: localStorage.getItem('username')
        });
    }

    componentDidUpdate(prevProps){
        if (this.friendRequestSocket) {
            this.friendRequestSocket.close();
        }
        if (this.props !== prevProps && this.props.loggedIn){
            this.friendRequestSocket = new WebSocket(
                'ws://127.0.0.1:8000/ws/friendRequestsNotification/' + this.props.userid
            );
            this.friendRequestSocket.onmessage = function (event) {
                const friend_request = JSON.parse(event.data).friend_request;
                const message = `${friend_request.user.username} has sent you a Friend Request`
                toast(
                    message, 
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
                    {!this.props.loggedIn ?
                        (<div className='container-fluid mt-2'>
                            <h1>Budget Tracker</h1>
                        </div>)
                        :
                        (
                            <div className='container-fluid mt-2'>
                                <div></div>
                                <div className='row align-items-center m-2'>
                                    <div className='col pt-2'>
                                        <p>{this.props.username}</p>
                                    </div>
                                    <div className='col'>
                                        <div className='dropdown'>
                                            <i className='fa fa-user-circle-o fa-3x' type='button' data-bs-toggle='dropdown'></i>
                                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                                <li>
                                                    <Link style={{ textDecoration: 'none' }} to={'/friendRequests'}> <p className="dropdown-item">Friend Requests</p> </Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link style={{ textDecoration: 'none' }} to={'/friends'}> <p className="dropdown-item">Friends</p> </Link> </li>
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

export default NavBar;