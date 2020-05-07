import React,{useReducer, useEffect,useContext, useState} from 'react'
import { reducer, inialState } from '../Customs/todoRed2'
import { AuthContext } from '../Contexts/AuthContextProvider'
import axios from 'axios'
import {Primary, Delete} from './Button'
import ToDoInput from './ToDoInput'

function ToDoRed2() {
    const { headers } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, inialState)
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const [value, setValue] = useState("asc-createdAt")

    // console.log(state)
    // console.log(state.todo)
    
    useEffect(()=>{
        dispatch({type: "LOADING"})
        getTodos()
    }, [])
    
    const getTodos = async () =>{
        try {
            let res = await axios.get("/todo",{headers})
            let data = await res.data
            dispatch({type: "GET_TODO", payload: data})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }    
    }

    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = async (value) =>{
        try {
            let res = await axios.put("/todo/archive", {id: value},{headers})
            dispatch({type: "REMOVE_TODO", payload:value})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const sortBY = (key) => dispatch({type: "SORT_TODO", payload:key})
    
    const onDelete = async (value) =>{
        try {
            await axios.delete("/todo",{data:{id: value},headers})
            dispatch({type: "REMOVE_TODO", payload:value})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const onSubmit = async () => {
        try {
            await axios.put("/todo", {id, title, description},{headers})
            dispatch({type: "EDIT_TODO", payload:{id, title, description}})
            onEdit('','','')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="form-inline">
                <label htmlFor="sel1">Selet to Sort the list :</label>
                <select className="form-control ml-2 mr-2" id="sel1" value={value} onChange={(e)=>setValue(e.target.value)}>
                    <option value="asc-createdAt">Date-asc</option>
                    <option value="desc-createdAt">Date-desc</option>
                    <option value="asc-title">Title-asc</option>
                    <option value="desc-title">Title-desc</option>
                </select>
                <Primary name="Sort" fn={()=> sortBY(value) } />
            </div>

            { state.loading && <p>....loading</p> }
            { state.error && <p> {state.error} </p> }
            { id &&         
                <ToDoInput
                    Head="Edit ToDo"
                    title={title}
                    description={description}
                    titlefn={(e) =>{ setTitle(e.target.value) }}
                    desfn={(e) =>{ setDescription(e.target.value) }}
                    onSubmit={onSubmit}
                />
            }

            {
            !id && <>
            { state.todo && state.todo.map((todo)=>(
                <div key={todo._id} className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.description}</p>
                    <Primary name="Edit" fn={()=>{onEdit(todo._id, todo.title, todo.description)}} />
                    <Primary name="Done" fn={()=>{onDone(todo._id)}} />
                    <Delete fn={()=>{onDelete(todo._id)}} />
                    <p className="text-secondary">
                    { 
                        todo.createdAt === todo.updatedAt 
                        ? `Created on : ${new Date(todo.createdAt).toLocaleString('en-GB')} ` 
                        : `Updated on : ${new Date(todo.updatedAt).toLocaleString('en-GB')} `
                    }
                    </p>
                </div>
            </div>
            ))}
            </>
            }
        </div>
    )
}

export default ToDoRed2
