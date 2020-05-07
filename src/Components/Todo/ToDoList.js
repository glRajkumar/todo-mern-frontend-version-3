import React, { useState, useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import {Primary, Delete} from './Button'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { inialState, reducer } from "../../Reducers/ToDoReducer"
import SortToDo from './SortToDo'
import ToDoInput from './ToDoInput'
import Loading from '../Common/Loading'

function ToDoList(){
    const { headers } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, inialState)
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
   
    useEffect(()=>{
        const loadData = async () => {
            try {
                    dispatch({type: "LOADING"})
                    const res = await axios.get("/todo",{headers})
                    let data = await res.data
                    dispatch({type: "GET_TODO", payload: data})
                } catch (error) {
                    console.log(error)
                    dispatch({type: "ERROR"})
            }
        }
        loadData()
    }, [])

    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = async (value) =>{
        try {
            dispatch({type: "LOADING"})
            await axios.put("/todo/archive", {id: value},{headers})
            dispatch({type: "REMOVE_TODO", payload:value})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const sortBY = (key) => dispatch({type: "SORT_TODO", payload:key})
    
    const onDelete = async (value) =>{
        try {
            dispatch({type: "LOADING"})
            await axios.delete("/todo",{data:{id: value},headers})
            dispatch({type: "REMOVE_TODO", payload:value})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const onSubmit = async () => {
        try {
            dispatch({type: "LOADING"})
            await axios.put("/todo", {id, title, description},{headers})
            dispatch({type: "EDIT_TODO", payload:{id, title, description}})
            onEdit('','','')
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const List = () => (
        state.todo.length === 0 
        ? (
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3 text-center">
                    Start Writig... <br />
                    <Link to="/createtodo">Create your first work</Link>
                </div>
             </div>
        ) : (
         <div className="row">
             <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
             { state.todo.map((todo)=>(
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
                 ))
             }            
             </div>
         </div>    
         )  
    )
    
    return (
        <>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="mt-2 mb-2 text-center">Todos
                    <Primary name="Create Todos" fn={()=>{ history.push("/createtodo")}} />
                    <Primary name="Archived Todos" fn={()=>{ history.push('/archived')}} />
                    </h4>
                </div>
            </div>

            <SortToDo SortBY={sortBY} />

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

            { !id && 
            <>
                {state.loading ? <Loading /> : <List />}            
            </> 
            }
        </>
    )          
}

export default ToDoList