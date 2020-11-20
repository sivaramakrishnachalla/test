import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/list" component={DashBoard} />
    </Switch>
  </Router>
)

export default App;