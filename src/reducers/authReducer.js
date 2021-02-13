const initState={
    user:null,
}
const authReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'SIGN_IN':  
            return {
                ...state,
                user:action.user,
            }
    
        case 'SIGN_OUT':
            return {
                user:null,
            }

        default:
            return state;
    }
}
export default authReducer