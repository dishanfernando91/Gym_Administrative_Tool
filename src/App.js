import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './components/Navbar';
// import LandingPage from './components/LandingPage'
import EditMember from './components/member_components/EditMember';
import CreateMember from './components/member_components/CreateMember';
import MemberList from './components/member_components/MemberList';
import MemberDetail from './components/member_components/MemberDetail';

import CreatePackage from './components/package_component/CreatePackage';

import CreatePayment from './components/payment_components/CreatePayment';
import PaymentHistory from './components/payment_components/PaymentHistory';

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
      <Route path='/packages' exact component = {CreatePackage} />
      <Route path='/payments' exact component = {CreatePayment} />
      <Route path='/payments/history' exact component = {PaymentHistory} />
   </Router>
  );
}

export default App;
