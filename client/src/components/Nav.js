import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ()=> {
    return(
        <nav><ul><Link to="/"className="link-nav"><li>All applied jobs</li></Link><li>Add new job</li><li>My Account</li></ul></nav>
    )
}

export default Nav