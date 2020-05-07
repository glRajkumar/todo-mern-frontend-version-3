import React from 'react'

export const Primary = ({name, fn}) => ( <button className="btn btn-primary btn-sm m-2" onClick={fn}> {name} </button> )

export const Delete = ({fn}) => ( <button className="btn btn-danger btn-sm" onClick={fn}>Delete</button> )

export const Submit = ({fn}) => ( <button className="btn btn-outline-primary" onClick={fn}>Submit</button> )