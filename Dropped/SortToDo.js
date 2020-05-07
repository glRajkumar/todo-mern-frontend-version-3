import React,{useState, useContext} from 'react'
import {Primary, Delete} from './Button'
import Loading from './Loading'
import { AuthContext } from '../Contexts/AuthContextProvider'
import axios from 'axios'
import ToDoInput from './ToDoInput'

const SortToDo = (props) => {
    const [id, setId] = useState('')
    const [todos, setToDo] = useState(props.data || [])
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const [ loading, setLoading ] = useState(false)
    const { headers } = useContext(AuthContext)

    // console.log(props.data)
    // console.log(props.loading)

    const getTodos = async () =>{
        try {
            let res = await axios.get("/todo",{headers})
            let data = await res.data
            setToDo(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }    
    }
    
    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = async (value) =>{
        try {
            setLoading(true)
            await axios.put("/todo/archive", {id: value},{headers})
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async (value) =>{
        try {
            setLoading(true)
            await axios.delete("/todo",{data:{id: value},headers})
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        try {
            await axios.put("/todo", {id, title, description},{headers})
            onEdit('','','')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
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
                {loading ? <Loading /> 
                : (
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                    { todos.map((todo)=>(
                        <div key={todo._id} className="card mb-2">
                            <div className="card-body">
                                <h5 className="card-title">{todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
                                <Primary name="Edit" fn={()=>{onEdit(todo._id, todo.title, todo.description)}} />
                                <Primary name="Done" fn={()=>{onDone(todo._id)}} />
                                <Delete fn={()=>{onDelete(todo._id)}} />
                            </div>
                        </div>
                        ))
                    }            
                    </div>
                </div>    
                )}            
            </> 
            }        
        </>
    )
}

export default SortToDo