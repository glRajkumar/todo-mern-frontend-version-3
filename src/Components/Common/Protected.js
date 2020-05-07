import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Protected = ({ component: Component, token, ...rest }) =>{
    return(
        <Route {...rest} render={
            props =>{
                if(token){
                    return <Component {...rest} {...props} />
                }else{
                    return <Redirect to='/unauth' />
                }
            } 
         } />
    )
}

export default Protected