import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './components/Navbar';
// import LandingPage from './components/LandingPage'
import EditMember from './components/EditMember';
import CreateMember from './components/CreateMember';
import MemberList from './components/MemberList';
import MemberDetail from './components/MemberDetail';

function App() {
  return (
   <Router>
      <Navbar />
      <br />
      {/* <Route path='/' exact component = {LandingPage} /> */} 
      <Route path='/create' exact component = {CreateMember} />
      <Route path='/show/' exact component = {MemberList} />
      <Route path='/show/:id' exact component = {MemberDetail} />
      <Route path='/edit/:id' exact component = {EditMember} />
   </Router>
  );
}

export default App;
