import React, { Component } from 'react'

import { Link, NavLink } from 'react-router-dom';

export class NavItem extends Component {
  render() {

    let { linkPath, linkName } =  this.props

    return (
      <li className="menu-item">
        {/* <Link to={linkPath}>{linkName}</Link> */}
        <NavLink to={linkPath} activeClassName="active-nav-item">{linkName}</NavLink>
      </li>
    )
  }
}

export default NavItem
