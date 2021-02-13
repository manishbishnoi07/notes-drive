import React,{useEffect,useState} from 'react'
import "./Dashboard.css"
import Folder from './Folder'
import Modal from './Modal'
import {db} from '../firebase'
import {addFolder} from '../actions/folderActions'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import Header from './Header'
import { search } from '../actions/searchActions'
const Dashboard = () => {
    const history=useHistory();
    const folders=useSelector(state=> state.folder)
    const [filteredFolders,setFilteredFolders]=useState([])
    const key=useSelector(state=>state.search)
    const dispatch=useDispatch()
    useEffect(()=>{
        const unsubscribe=dispatch(search(''))
        db.collection('folders').orderBy("timestamp", "desc")
        .onSnapshot((snapshot)=>{
            dispatch(addFolder(snapshot.docs))    
        })
        return unsubscribe;
    },[dispatch])

    useEffect(()=>{
        setFilteredFolders(folders.filter((folder)=> key==='' || folder.name.toLowerCase().indexOf(key)!==-1))
    },[key,folders])

    return (
        <>
            <Header/>
            <section>
                <div className='dashboard'>
                    <div className="dashboard__heading">
                        <h3>Folders</h3>
                    </div>
                    <div className="dashboard__folders">
                        {filteredFolders.map(folder=>(
                            <Folder onClick={()=>history.push(`/${folder.id}`)} name={folder.name} createdBy={folder.createdBy} key={folder.id} folderId={folder.id} />
                        ))}
                    </div>
                </div>
            </section>
            <Modal text='Folder Name' title='Add Folder'/>
        </>
    )
}

export default Dashboard
