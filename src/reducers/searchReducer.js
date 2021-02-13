const initState=''
const searchReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'SEARCH':
            state=action.key    
            return state

        default:
            return state;
    }
}
export default searchReducer