import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ToDoInput from './ToDoInput'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import Loading from '../Common/Loading'

function CreateTodo(){
    const [ loading, setLoading ] = useState(false)
    const { headers } = useContext(AuthContext)    
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    
    const onSubmit = async() => {
        try {
            setLoading(true)
            await axios.post("/todo", { title, description }, {headers})
            history.push("/todolist")
        } catch (error) {
            console.log(error)
        }
    }

    return !loading ? (
      <ToDoInput
       Head="Create ToDo"
       title={title}
       description={description}
       titlefn={(e) =>{ setTitle(e.target.value) }}
       desfn={(e) =>{ setDescription(e.target.value) }}
       onSubmit={onSubmit}
      />
    )
    : (<Loading />)
}

export default CreateTodo