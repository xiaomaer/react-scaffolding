import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';

const Login = () => import('../pages/Login');

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      {/* 这样就可以直接访问子路由了 */}
      <Home />
    </Switch>
  </Router>
);
export default App;
