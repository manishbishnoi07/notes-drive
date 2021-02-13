const initState=[]
const folderReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'ADD_FOLDER': 
            return action.docs.map((doc)=>{
                return(
                    {
                        name:doc.data().name,
                        createdBy:doc.data().createdBy || '',
                        id:doc.id
                    }
                )
            })
    
        case 'DELETE_FOLDER':
            state=false    
            return state

        default:
            return state;
    }
}
export default folderReducer