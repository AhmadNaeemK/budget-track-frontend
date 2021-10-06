import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// styles
import { GlobalStyle } from './GlobalStyle';
import AllFriendRequest from './components/FriendRequests';
import AllScheduledTransactions from './components/AllScheduledTransactions';
import AllSplitTransactions from './components/AllSplitTransactions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem('refresh') ? true : false
    })
  }

  handleIsLoggedIn = (status) => {
    this.setState({
      isLoggedIn: status
    })
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div class="row flex-nowrap">
            <SideBarComponent isLoggedIn={this.state.isLoggedIn} />
            <div class="col p-0">
              <NavBar loggedIn={this.state.isLoggedIn} handleLogout={this.handleIsLoggedIn} />
              <Routes>
                <Route path='/' element={<LoginForm handleLogin={this.handleIsLoggedIn} />} />
                <Route path='/signup' element={<RegistrationForm />} />
                <Route path='/onboarding' element={<UserOnboarding />} />
                <Route path='/home' element={<Home />} />
                <Route path='/expenses' element={<AllTransactions type='expense' />} />
                <Route path='/incomes' element={<AllTransactions type='income' />} />
                <Route path='/accounts' element={<AllAccounts />} />
                <Route path='/friends' element={<FriendsPage />} />
                <Route path='/friendRequests' element={<AllFriendRequest />} />
                <Route path='/scheduledTransactions' element={<AllScheduledTransactions />} />
                <Route path='/splitExpenses' element={<AllSplitTransactions />} />
              </Routes>
            </div>
          </div>
        </div>
        <GlobalStyle />
      </ Router>
    )
  }
}

export default App;

