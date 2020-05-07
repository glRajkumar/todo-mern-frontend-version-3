import React,{useReducer, useEffect,useContext} from 'react'
import { reducer, inialState } from '../Customs/todoReducer'
import { AuthContext } from '../Contexts/AuthContextProvider'
import axios from 'axios'

function ToDoReduce() {
    const { headers } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, inialState)

    useEffect(()=>{
        dispatch({type: "FETCH_PENDING"})
        const getTodos = async () =>{
            try {
                let res = await axios.get("/todo",{headers})
                let data = await res.data
                dispatch({type: "FETCH_SUCCESS", payload: data})
            } catch (error) {
                console.log(error)
                dispatch({type: "FETCH_ERROR"})
            }    
        }
        getTodos()    
    }, [])

    // console.log(state)
    return (
        <div>
            { state.loading && <p>....loading</p> }
            { state.error && <p> {state.error} </p> }
            { state.todo && state.todo.map((todo)=>(
                <div key={todo._id} className="card mb-2">
                    <div className="card-body">
                        <h5 className="card-title">{todo.title}</h5>
                        <p className="card-text">{todo.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ToDoReduce