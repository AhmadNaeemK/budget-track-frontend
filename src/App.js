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

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div class="row flex-nowrap">
            <SideBarComponent />
            <div class="col p-0">
              <NavBar />
              <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/signup' element={<RegistrationForm />} />
                <Route path='/onboarding' element={<UserOnboarding />} />
                <Route path='/home' element={<Home />} />
                <Route path='/expenses' element={<AllTransactions type='Expenses' />} />
                <Route path='/incomes' element={<AllTransactions type='Incomes' />} />
                <Route path='/accounts' element={<AllAccounts />} />
                <Route path='/friends' element={<FriendsPage />} />
                <Route path='friendRequests' />
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

