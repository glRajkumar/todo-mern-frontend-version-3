import React from 'react'
import { useNvalid, useEvalid, usePvalid } from '../Customs/useValidation'
import Input from './Input'
import {Submit} from './Button'

const FormUi = (props) => (
    <>
    <div className="row">
        <div className="col-md-4 offset-md-4 ">
            <h4 className="text-center"> {props.title} </h4>
        </div>
    </div>
    
    <div className="row">
        { props.logfail &&
            <div className="col-md-4 offset-md-4 ">
                <div className="alert alert-danger" role="alert">
                Invalid {props.title} credentials
                </div>
            </div>
        }   
    </div>
    <div className="row">            
        <div className="col-md-4 offset-md-4 col-sm-12">
          <div>
            { props.isNameNeed && <Input label="Name" ref={props.nameRef} name="name" type="text" valType={useNvalid} /> }
            <Input label="Email" ref={props.emailRef} name="email" type="email" valType={useEvalid} />
            <Input label="Password" ref={props.passRef} name="password" type="password" valType={usePvalid} />

            <Submit fn={props.onSubmit} />
          </div>
        </div>
    </div>
    </>
)

export default FormUi