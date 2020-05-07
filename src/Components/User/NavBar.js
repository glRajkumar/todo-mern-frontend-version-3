import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { Link } from 'react-router-dom'

const NavBar = ({email}) =>{
    const { logout } = useContext(AuthContext)

    return(
    <nav className="navbar text-light bg-dark">
        <Link className="navbar-brand text-light" to="/">
            Todo App
        </Link>
        
        <div className="form-inline">
            {email}
        { 
            email ? 
            <button onClick={logout} className="btn btn-default text-light">
                Log Out
            </button> 
            : ""
        }
        </div>
    </nav>
)
}

export default NavBar