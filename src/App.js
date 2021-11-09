import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import './App.css'

// styles
import { GlobalStyle } from './GlobalStyle';

// component
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllTransactions from './components/AllTransactions'
import AllAccounts from './components/AllAccounts';
import UserOnboarding from './components/UserOnBoarding'
import FriendsPage from './components/Friends';
import SideBarComponent from './components/SideBar';
import AllFriendRequest from './components/FriendRequests';
import AllScheduledTransactions from './components/AllScheduledTransactions';
import AllSplitTransactions from './components/AllSplitTransactions';
import SplitDetail from './components/SplitDetail';
import UserProfile from './components/Profile';
import UserVerification from './components/UserVerification';
import API from './API';
import RecoveryVerificationPage from './components/recoveryAndVerification';
import SignUpLoginPage from './components/SignUpAndLogin';
import PasswordRecoveryPage from './components/RecoverPassword';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      loading: false,
    }
  }
  

  componentDidMount() {
    if (localStorage.getItem('userid')) {
      API.fetchUser(localStorage.getItem('userid')).then(
        (user) => {
          this.setState({
            isLoggedIn: localStorage.getItem('refresh') ? true : false,
            user: user
          })
        })
    }
  }

  handleIsLoggedIn = (status, user) => {
    this.setState({
      isLoggedIn: status,
      user: user
    })
  }

  updateUser = (user) => {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div className="row flex-nowrap">
            <SideBarComponent isLoggedIn={this.state.isLoggedIn} />
            <div className="col p-0">
              <NavBar
                loggedIn={this.state.isLoggedIn}
                user={this.state.user}
                handleLogout={this.handleIsLoggedIn} />
              <Switch>
                <Route exact path='/'> <SignUpLoginPage handleLogin={this.handleIsLoggedIn}/> </Route>
                <Route path='/onboarding' > <UserOnboarding /> </Route>
                <Route path='/home'> <Home /> </Route>
                <Route path='/expenses'> <AllTransactions type='expense' /> </Route>
                <Route path='/incomes'> <AllTransactions type='income' /> </Route>
                <Route path='/accounts'> <AllAccounts /> </Route>
                <Route path='/friends'> <FriendsPage /> </Route>
                <Route path='/friendRequests'> <AllFriendRequest /> </Route>
                <Route path='/scheduledTransactions'> <AllScheduledTransactions /> </Route>
                <Route path='/splitExpenses'> <AllSplitTransactions /> </Route>
                <Route path='/splitExpense/:splitId' component={SplitDetail} />
                <Route path='/profile'> <UserProfile user={this.state.user} updateUser={this.updateUser} /> </Route>
                <Route path='/user/verify' component={UserVerification} />
                <Route path='/signin-error' component={RecoveryVerificationPage} />
                <Route path='/forgotPassword'> <RecoveryVerificationPage passwordRecovery={true} /> </Route>
                <Route path='/recover/password' component={PasswordRecoveryPage} />
              </Switch>
            </div>
          </div>
        </div>
        <GlobalStyle />
      </ Router>
    )
  }
}

export default App;

