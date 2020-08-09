import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './components/Navbar';
import EditMember from './components/EditMember';
import CreateMember from './components/CreateMember';
import MemberList from './components/MemberList';

function App() {
  return (
   <Router>
      <Navbar />
      <br />
      <Route path='/' exact component = {MemberList} />
      <Route path='/create' exact component = {CreateMember} />
      <Route path='/edit/:id' exact component = {EditMember} />
   </Router>
  );
}

export default App;
