import React, { useRef, useEffect} from 'react'
import { useNvalid, useEvalid, usePvalid } from '../Customs/useValidation'
import useInput from '../Customs/useInput'

function FormCheck(props) {
    const [ nvalue, nonChange, nmsg, nerr ] = useInput('', useNvalid)
    const [ evalue, eonChange, emsg, eerr ] = useInput('', useEvalid)
    const [ pvalue, ponChange, pmsg, perr ] = useInput('', usePvalid)
   
    let nameRef = useRef('')
    let emailRef = useRef('')
    let passRef = useRef('')
    let SubRef = useRef('')
    
    useEffect(()=>{
        nameRef.current.focus() 
    }, [])

    function nameKeyDown(e) {
        if(e.key === "Enter"){
            emailRef.current.focus()
        }
    }

    function emailKeyDown(e) {
        if(e.key === "Enter"){
            passRef.current.focus()
        }
    }
    
    function passKeyDown(e) {
        if(e.key === "Enter"){
            SubRef.current.focus()
        }
    }

    // function subKeyDown(e) {
    //     if(e.key === "Enter"){
    //         e.preventDefault()
    //         onSubmit(e)
    //     }
    // }

    return (
        <>
        <div className="row">
            <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1">
                <h4 className="text-center"> {props.title} </h4>
            </div>
        </div>
        
        <div className="row">
            { props.logfail &&
                <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1">
                    <div className="alert alert-danger" role="alert">
                    Invalid {props.title} credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-10 offset-sm-1">
                <div className="form-group">
                    <label htmlFor="name"> Name </label>
                    <input
                        className="form-control"
                        ref={nameRef}
                        onKeyDown={nameKeyDown} 
                        name="name"
                        type="text"
                        value={nvalue}
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
                        value={evalue}
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
                        value={pvalue}
                        onChange={ponChange}
                    />
                </div>
                { 
                perr && <div className="alert alert-danger" role="alert"> {pmsg} </div>                        
                }

                <button
                 className="btn btn-outline-primary" 
                 ref={SubRef} 
                 onClick={props.onSubmit}
                >Submit</button>
            </div>
        </div>
        </>
    )
}

export default FormCheck
