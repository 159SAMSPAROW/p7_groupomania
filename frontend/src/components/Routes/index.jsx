import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Main from '../../pages/Main';
import Navbar from '../Navbar';

function Index() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/profil" element={ <Profil /> }/>
        <Route path="/main"  element={ <Main /> }/>
      </Routes>
    </Router>
  );
}

export default Index;