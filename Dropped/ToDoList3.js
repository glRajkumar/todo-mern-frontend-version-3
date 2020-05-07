import React from 'react'
import { Link } from 'react-router-dom'
import {Primary, Delete} from './Button'

function ToDoList({todo, onEdit, onDone, onDelete}){

    return (
        todo.length === 0 
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
             { todo.map((todo)=>(
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
}

export default ToDoList