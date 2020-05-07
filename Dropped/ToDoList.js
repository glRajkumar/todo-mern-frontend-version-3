import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import {Primary, Delete} from './Button'
import ToDoInput from './ToDoInput'
import { AuthContext } from '../Contexts/AuthContextProvider'
import Loading from './Loading'

function ToDoList(){
    const [ loading, setLoading ] = useState(true)
    const { headers } = useContext(AuthContext)
    const [todos, setToDo] = useState([])
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
   
    useEffect(()=>{
        let mounted = true
        if(mounted){
            if(!id){
                getTodos()
            }    
        } 
        return ()=> mounted = false
       }, [id])
    
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

    const List = () => (
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

    return (
        <div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h4 className="mt-2 mb-2">Todos
                    <Primary name="Create Todos" fn={()=>{ history.push("/createtodo")}} />
                    <Primary name="Archived Todos" fn={()=>{ history.push('/archived')}} />
                    </h4>
                </div>
            </div>
            <Link to="/todoui">TodoUI</Link><br /><br />
            <Link to="/todoreducer">TodoReducer</Link><br /><br />
            <Link to="/todoreducer2">TodoReducer2</Link><br /><br />

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
                {loading ? <Loading /> : <List />}            
            </> 
            }
        </div>
    )          
}

export default ToDoList