import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// component
import Header from './components/Header';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup'

// styles
import { GlobalStyle } from './GlobalStyle';

const App = () => (
  <Router>
    <Header />
    <Routes>

      <Route path='/' element={<LoginSignup />} />
      <Route path='/home' element={<Home />} />

    </Routes>
    <GlobalStyle />
  </ Router>
)

export default App;

