import React from 'react'
import useInput from '../Customs/useInput'

const Input = React.forwardRef((props, ref) =>{
    const [ value, onChange, msg, err ] = useInput('', props.valType)
    
    return(
        <>
        <div className="form-group">
            <label htmlFor={props.type}> {props.label} </label>
            <input
            className="form-control"
            ref={ref}
            name={props.name}
            type={props.type}
            value={value}
            onChange={onChange}
            />
        </div>
        { 
        err && <div className="alert alert-danger" role="alert"> {msg} </div>                        
        }
    </>
    )
})

export default Input