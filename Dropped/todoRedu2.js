export const inialState = {
    loading : true,
    todo : [],
    error : "" 
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading : true 
            }

        case "GET_TODO":
            return {
                loading : false,
                todo : action.payload,
                error : "" 
            }

        case "REMOVE_TODO":
            return {
                ...state,
                todo : state.todo.filter( todo => todo._id !== action.payload) 
            }

        case "EDIT_TODO":
            return {
                ...state,
                todo : state.todo.map( todo =>
                        todo._id === action.payload.id
                        ? { ...todo, title: action.payload.title, description: action.payload.description, updatedAt: new Date()  } 
                        : todo
                    ) 
            }

        case "SORT_TODO":
            let sortKey = action.payload.split("-")
            if(sortKey[0] === "asc"){
                return {
                    ...state,
                    todo : state.todo.sort((a, b)=> a[sortKey[1]] > b[sortKey[1]] ? 1 : -1)
                }
            }else{
                return {
                    ...state,
                    todo : state.todo.sort((a, b)=> a[sortKey[1]] < b[sortKey[1]] ? 1 : -1)
                }    
            }
               
        case "ERROR":
            return {
                ...state,
                loading : false,
                error : "something went wrong................." 
            }

        default: return state
    }
}