const initState=false
const modalReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'OPEN_MODAL':
            state=true    
            return state
    
        case 'CLOSE_MODAL':
            state=false    
            return state

        default:
            return state;
    }
}
export default modalReducer