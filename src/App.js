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
import LoginForm from './components/User/Login';
import AllTransactions from './components/AllTransactions'
import AllAccounts from './components/AllAccounts';
import UserOnboarding from './components/UserOnBoarding'
import RegistrationForm from './components/User/Register';
import FriendsPage from './components/Friends';
import SideBarComponent from './components/SideBar';
import AllFriendRequest from './components/FriendRequests';
import AllScheduledTransactions from './components/AllScheduledTransactions';
import AllSplitTransactions from './components/AllSplitTransactions';
import SplitDetail from './components/SplitDetail';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
    }
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem('refresh') ? true : false,
      username: localStorage.getItem('username')
    })
  }

  handleIsLoggedIn = (status, username) => {
    this.setState({
      isLoggedIn: status,
      username: username
    })
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div className="row flex-nowrap">
            <SideBarComponent isLoggedIn={this.state.isLoggedIn} />
            <div className="col p-0">
              <NavBar loggedIn={this.state.isLoggedIn} username={this.state.username} handleLogout={this.handleIsLoggedIn} />
              <Switch>
                <Route exact path='/'> <LoginForm handleLogin={this.handleIsLoggedIn} /> </Route>
                <Route path='/signup'> <RegistrationForm /> </Route>
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

