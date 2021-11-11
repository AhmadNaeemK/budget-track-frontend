import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

// styles
import './App.css'
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
import RecoveryVerificationPage from './components/recoveryAndVerification';
import SignUpLoginPage from './components/SignUpAndLogin';
import PasswordRecoveryPage from './components/RecoverPassword';
import API from './API';


class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('refresh')) {
      API.fetchUser(localStorage.getItem('userid')).then(user => {
        this.props.login(user)
      })
      API.fetchTransactionCategories().then(categories => {
        this.props.getCategories(categories)
      })
    }
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div className="row flex-nowrap">
            <SideBarComponent />
            <div className="col p-0">
              <NavBar />
              <Switch>
                <Route exact path='/'> <SignUpLoginPage /> </Route>
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
                <Route path='/profile'> <UserProfile /> </Route>
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

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch({
      type: 'user/login',
      payload: user
    })
  },
  getCategories: (categories) => {
    dispatch({
      type: 'transactionCategories/getCategories',
      payload: categories
    })
  },
})

export default connect(null, mapDispatchToProps)(App)

