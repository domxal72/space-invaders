import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class NavItem extends Component {
  render() {

    let { linkPath, linkName } =  this.props

    return (
      <li className="menu-item">
        <NavLink to={linkPath} activeClassName="active-nav-item">{linkName}</NavLink>
      </li>
    )
  }
}

export default NavItem
