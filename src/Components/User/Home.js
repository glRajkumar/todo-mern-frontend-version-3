import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
  
  return(
  <div className="container">
      <div className="jumbotron"> 
        <h2 className="text-center">Welcome to the ToDo</h2>
        <p className="text-center">New to here, <Link to="/signup">Sign Up</Link> </p>
        <p className="text-center">Already have an accout, <Link to="/login">Login</Link> </p>
      </div>
  </div>
)
}

export default Home