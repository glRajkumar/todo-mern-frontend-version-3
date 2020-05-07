import React, { createContext, useState, useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) =>{
  const [ email, setEmail ] = useState('')
  const [ token, setToken ] = useState('')
  const history = useHistory()

  let headers = {
    Authorization: "Bearer " + token
  }
 
  const updateEmail = value => setEmail(value)
  
  const updateToken = (value) => {
    localStorage.setItem("token", value);
    setToken(value)
  }
  
  useLayoutEffect(()=>{
    let existed = localStorage.getItem("token")
    if(existed){
      setToken(existed)
    } 
  
    if(token !== ''){
      axios.get("/user/me",{
        headers : {
            Authorization: "Bearer " + token
        }
    }).then((res)=>{
      setEmail(res.data.email)
      history.push("/todolist")
    })
    }
  }, [token])
  
  const logout = async () =>{
    await axios.post("/user/logout",{},{headers})
    localStorage.removeItem("token")
    setEmail('')
    setToken('')
    history.push("/login")
  }
  
  return(
      <AuthContext.Provider value={{email, token, headers, updateToken, updateEmail, logout}}>
          {props.children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider