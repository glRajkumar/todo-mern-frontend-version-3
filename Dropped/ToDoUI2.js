import React, { useState, useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {Primary} from './Button'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { inialState, reducer } from "../../Reducers/ToDoReducer"
import SortToDo from './SortToDo'
import ToDoInput from './ToDoInput'
import Loading from '../Common/Loading'
import ToDoList from './ToDoList'
import Pagination from './Pagination'

function ToDoUI() {
    const { headers } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, inialState)
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState(1)
    const [todoPerPage] = useState(5)
   
    useEffect(()=>{
        getTodos()
    }, [])
    
    //get page
    const indexOfLast = currentPage * todoPerPage
    const indexOfFirst = indexOfLast - todoPerPage
    const currentTodo = state.todo.slice(indexOfFirst, indexOfLast)

    //change page
    const paginate = pagenumber => setCurrentPage(pagenumber)

    const getTodos = async () =>{
        try {
            dispatch({type: "LOADING"})
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
            dispatch({type: "LOADING"})
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
                { state.loading 
                  ? <Loading /> 
                  : 
                  <>
                   <ToDoList todo={currentTodo} onEdit={onEdit} onDelete={onDelete} onDone={onDone} /> 
                   <Pagination todoPerPage={todoPerPage} total={state.todo.length} paginate={paginate} />
                  </>
                }            
            </> 
            }

        </>
    )
}

export default ToDoUI