const initState=[]
const fileReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'ADD_FILE': 
            return action.docs.map((doc)=>{
                 
                return(
                    {
                        name:doc.data().fileName,
                        date :doc.data().date,
                        size:doc.data().size,
                        url:doc.data().url,
                        id:doc.id
                    }
                )
            })
    
        case 'DELETE_FILE':
            state=false    
            return state

        case 'DELETE_ALL':
            return []
        default:
            return state;
    }
}
export default fileReducer