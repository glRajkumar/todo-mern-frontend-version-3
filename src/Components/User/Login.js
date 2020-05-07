import React, {useState, useContext, useRef, useEffect} from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import Loading from '../Common/Loading'
import { useEvalid, usePvalid } from '../../Customs/useValidation'
import useInput from '../../Customs/useInput'

const Login = () => {
    const { updateEmail, updateToken } = useContext(AuthContext)
    const [ email, eonChange, emsg, eerr ] = useInput('', useEvalid)
    const [ password, ponChange, pmsg, perr ] = useInput('', usePvalid)

    const [ logfail, setLogfail ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
    
    let emailRef = useRef('')
    let passRef = useRef('')
    let SubRef = useRef('')

    useEffect(()=>{
        emailRef.current.focus()
    }, [])

    function emailKeyDown(e) {
        if(e.key === "Enter") passRef.current.focus()
    }
    
    function passKeyDown(e) {
        if(e.key === "Enter") SubRef.current.focus()
    }

    const onSubmit = async (e) =>{
        e.preventDefault();        
        try {
            if(email !== "" && password !== "" && eerr === false && perr === false){
                setLoading(true)
                const res = await axios.post("/user/login",{ email, password })
                const data = await res.data
                updateToken(data) 
                updateEmail(email)
                history.push("/todolist")                    
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            setLogfail(true)
        }
    }

    return !loading ? (
        <>
        <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                <h4 className="text-center"> Log In </h4>
            </div>
        </div>
        
        <div className="row">
            { logfail &&
                <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                    <div className="alert alert-danger" role="alert">
                    Invalid Log In credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input
                        className="form-control"
                        ref={emailRef}
                        onKeyDown={emailKeyDown} 
                        name="email"
                        type="email"
                        value={email}
                        onChange={eonChange}
                    />
                </div>
                { 
                eerr && <div className="alert alert-danger" role="alert"> {emsg} </div>                        
                }

                <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input
                        className="form-control"
                        ref={passRef}
                        onKeyDown={passKeyDown} 
                        name="password"
                        type="password"
                        value={password}
                        onChange={ponChange}
                    />
                </div>
                { 
                perr && <div className="alert alert-danger" role="alert"> {pmsg} </div>                        
                }

                <button
                 className="btn btn-outline-primary" 
                 ref={SubRef} 
                 onClick={onSubmit}
                >Submit</button>
            </div>
        </div>

        <div className="row mt-2">
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                <h5>Don't have an account, <Link to="/signup">Sigh Up</Link></h5>
            </div>
        </div>
        </>
    ) : (<Loading />)
}

export default Login