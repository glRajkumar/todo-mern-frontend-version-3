import React,{useRef, useEffect} from 'react'

const ToDoInput = (props) =>{
    const textInputRef = useRef('')
    const textAreaRef = useRef('')
    const textSubRef = useRef('')

    useEffect(()=>{
        textInputRef.current.focus()
    }, [])

    function firstKeyDown(e) {
        if(e.key === "Enter"){
            textAreaRef.current.focus()
        }
    }

    function secondKeyDown(e) {
        if(e.key === "Enter"){
            textSubRef.current.focus()
        }
    }
    
    return(
        <>
            <div className="row m-2">
                <div className="col-md-6 offset-md-3 ">
                    <h4 className="text-center">{props.Head}</h4>
                </div>
            </div>
        
            <div className="row">                                 
            <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        className="form-control"
                        type="text"
                        defaultValue={props.title}
                        ref={textInputRef} 
                        onKeyDown={firstKeyDown}
                        onChange={props.titlefn}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="Description">Description </label>
                    <textarea 
                        className="form-control"
                        type="text"
                        defaultValue={props.description}
                        ref={textAreaRef}
                        onKeyDown={secondKeyDown}
                        onChange={props.desfn}
                        ></textarea>
                </div>
                <button className="btn btn-outline-primary" ref={textSubRef} onClick={props.onSubmit}>Submit</button>
            </div>
            </div>
        </>
    )
}    

export default ToDoInput