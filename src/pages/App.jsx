import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Home />
    </Switch>
  </Router>
);
export default App;
