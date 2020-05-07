export const inialState = {
    loading : true,
    todo : [],
    error : "" 
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_PENDING":
            return {
                ...state,
                loading : true 
            }

        case "FETCH_SUCCESS":
            return {
                loading : false,
                todo : action.payload,
                error : "" 
            }
    
        case "FETCH_ERROR":
            return {
                loading : false,
                todo : [],
                error : "something went wrong................." 
            }
        default: return state
    }

}