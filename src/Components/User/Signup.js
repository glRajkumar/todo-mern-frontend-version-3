import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import Loading from '../Common/Loading'
import { useNvalid, useEvalid, usePvalid } from '../../Customs/useValidation'
import useInput from '../../Customs/useInput'

const Signup = () =>{
    const [ name, nonChange, nmsg, nerr ] = useInput('', useNvalid)
    const [ email, eonChange, emsg, eerr ] = useInput('', useEvalid)
    const [ password, ponChange, pmsg, perr ] = useInput('', usePvalid)
   
    let nameRef = useRef('')
    let emailRef = useRef('')
    let passRef = useRef('')
    let SubRef = useRef('')

    const [ logfail, setLogfail ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
    
    useEffect(()=>{
        nameRef.current.focus() 
    }, [])

    function nameKeyDown(e) {
        if(e.key === "Enter") emailRef.current.focus()
    }

    function emailKeyDown(e) {
        if(e.key === "Enter") passRef.current.focus()
    }
    
    function passKeyDown(e) {
        if(e.key === "Enter") SubRef.current.focus()
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            if(name !== '' && email !== "" && password !== "" && nerr === false && eerr === false && perr === false){
                setLoading(true)
                await axios.post("/user/register",{ name, email, password })
                history.push("/login")
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
            <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1">
                <h4 className="text-center"> Sign Up </h4>
            </div>
        </div>
        
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1">
                    <div className="alert alert-danger" role="alert">
                    Invalid Sign Up credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                <div className="form-group">
                    <label htmlFor="name"> Name </label>
                    <input
                        className="form-control"
                        ref={nameRef}
                        onKeyDown={nameKeyDown} 
                        name="name"
                        type="text"
                        value={name}
                        onChange={nonChange}
                    />
                </div>
                { 
                nerr && <div className="alert alert-danger" role="alert"> {nmsg} </div>                        
                }

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
                <h5>Already have an account, <Link to="/login">Log In</Link></h5>
            </div>
        </div>
        </>
    ) : (<Loading />)
}

export default Signup