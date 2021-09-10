import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// component
import Header from './components/Header';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup'
import AllTransactions from './components/AllTransactions'
import AllAccounts from './components/AllAccounts';

// styles
import { GlobalStyle } from './GlobalStyle';

const App = () => (
  <Router>
    <Header />
    <Routes>

      <Route path='/' element={<LoginSignup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/transactions' element={<AllTransactions />} />
      <Route path='/accounts' element={<AllAccounts />} />

    </Routes>
    <GlobalStyle />
  </ Router>
)

export default App;

