import React,{useEffect, useContext, useReducer} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Primary, Delete} from './Button'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import Loading from '../Common/Loading'
import { reducer, inialState } from '../../Reducers/ToDoReducer'
import SortToDo from './SortToDo'

function Archived(){
    const { headers } = useContext(AuthContext)    
    const history = useHistory()
    const [ {loading, todo}, dispatch ] = useReducer(reducer, inialState)
    
    useEffect(()=>{
        const loadData = async () => {
            try {
                    dispatch({type: "LOADING"})
                    const res = await axios.get("/todo/finished",{headers})
                    let data = await res.data
                    dispatch({type: "GET_TODO", payload: data})
                } catch (error) {
                    console.log(error)
                    dispatch({type: "ERROR"})
            }
        }
        loadData()
    }, [])

    const sortBY = (key) => dispatch({type: "SORT_TODO", payload:key})

    const onDelete = async(value) =>{
        try {
            dispatch({type: "LOADING"})
            await axios.delete("/todo",{data:{id: value},headers})
            dispatch({type: "REMOVE_TODO", payload:value})
        } catch (error) {
            console.log(error)
            dispatch({type: "ERROR"})
        }
    }

    const List = () => (
        todo.length === 0 
        ? (
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3 text-center">
                    Nothing Archived...
                </div>
            </div>
        ) : (
            <div className="row">
                <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                    { todo.map((todo)=>(
                        <div key={todo._id} className="card mb-2">
                            <div className="card-body">
                                <h5 className="card-title">{todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
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
        <div className="row mt-1 ml-1">
            <Primary name="Back to Todos" fn={()=>{history.push('/todolist')}} />
        </div>

        <SortToDo SortBY={sortBY} />

        { loading ? <Loading /> : <List /> }
    </>
  )
}

export default Archived