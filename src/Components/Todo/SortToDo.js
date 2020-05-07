import React,{useState} from 'react'
import {Primary} from './Button'

function SortToDo(props) {
    const [value, setValue] = useState("asc-createdAt")

    return (
        <div className="form-inline offset-md-3  offset-sm-1 mt-2">
            <label htmlFor="sel1">Selet to Sort the list : {" "} </label>
            <select className="form-control ml-2 mr-2" id="sel1" value={value} onChange={(e)=>setValue(e.target.value)}>
                <option value="asc-createdAt">Date-asc</option>
                <option value="desc-createdAt">Date-desc</option>
                <option value="asc-title">Title-asc</option>
                <option value="desc-title">Title-desc</option>
            </select>
            <Primary name="Sort" fn={()=> props.SortBY(value)} />
        </div>
    )
}

export default SortToDo