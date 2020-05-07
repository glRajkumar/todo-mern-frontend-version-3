import React,{useContext, useState, useEffect} from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import useFetch from '../Customs/useFetch'
import { useHistory } from 'react-router-dom'
import {Primary} from './Button'
import SortToDo from './SortToDo'
import Loading from './Loading'

function TodoUI() {
    const { headers } = useContext(AuthContext)
    const { loading, data } = useFetch("/todo", headers)
    const history = useHistory()
    const [ bool, setBool ] = useState(true)
    const [value, setValue] = useState("asc-createdAt")
    let [todoData, setTodoData] = useState([])

    useEffect(()=>{
         setTodoData(data)
    }, [data])

    const sortBY = (key) =>{
        let sortKey = key.split("-")
        if (sortKey[0] === "asc") {
          setTodoData(todoData => todoData.sort((a, b)=> a[sortKey[1]] > b[sortKey[1]] ? 1 : -1))            
        } else {
          setTodoData(todoData => todoData.sort((a, b)=> a[sortKey[1]] < b[sortKey[1]] ? 1 : -1))
        }    
        setBool(bool => !bool)
    }

    // const sortBY = (key) =>{
    //     setTodoData(todoData => todoData.sort((a, b)=> a.createdAt < b.createdAt ? 1 : -1))
    //     setBool(bool => !bool)
    // }
    // const sortBY = () =>{
        // let m = todoData.sort((a, b)=>{
        //     let c = new Date(a.createdAt).getTime()
        //     let d = new Date(b.createdAt).getTime()
        //     return c < d ? 1 : -1
        // })
        // setTodoData(todoData => todoData.sort((a, b)=> new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1))
    // }

    return (
        <>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h4 className="mt-2 mb-2">Todos
                    <Primary name="Create Todos" fn={()=>{ history.push("/createtodo")}} />
                    <Primary name="Archived Todos" fn={()=>{ history.push('/archived')}} />
                    </h4>

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
                </div>
            </div>

            {loading ? <Loading /> : <SortToDo data={todoData} loading={loading} /> }

             
        </>
    )          
}

export default TodoUI
