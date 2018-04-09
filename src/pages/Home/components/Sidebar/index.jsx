import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const Sidebar = () => (
  <ul className="page-sidebar-list">
    <li>
      <NavLink exact to="/" className="page-sidebar-item" activeClassName="page-sidebar-item-active">Home</NavLink>
    </li>
    <li>
      <NavLink to="/bubblegum" className="page-sidebar-item" activeClassName="page-sidebar-item-active">Bubblegum</NavLink>
    </li>
    <li>
      <NavLink to="/shoelaces" className="page-sidebar-item" activeClassName="page-sidebar-item-active">Shoelaces</NavLink>
    </li>
  </ul>
);

export default Sidebar;
