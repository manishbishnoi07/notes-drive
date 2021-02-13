import React,{useState,useEffect} from 'react'
import './Files.css'
import File from './File'
import Modal from './Modal'
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory, useParams } from "react-router-dom";
import Header from './Header';
import { addFile } from '../actions/fileAction';
import {useDispatch, useSelector} from 'react-redux';
import {db} from '../firebase'
import { search } from '../actions/searchActions';
const Files = () => {
    const {id}=useParams();
    const history=useHistory();
    const dispatch=useDispatch()
    const files = useSelector(state => state.file)
    const key=useSelector(state=>state.search)
    const [filteredFiles,setFilteredFiles]=useState([])
    const [name,setName]=useState('')
    useEffect(()=>{
        dispatch(search(''))
        const unsubscribe1=db.collection('folders').doc(id)?.onSnapshot(snapshot=>setName(snapshot.data()?.name))
        const unsubscribe2=db.collection('folders').doc(id)?.collection('files')?.orderBy("date", "desc")
        .onSnapshot((snapshot)=>{
            dispatch(addFile(snapshot.docs))    
        })
        return ()=> {
            unsubscribe1() 
            unsubscribe2() 
            dispatch(addFile([]))
        };
    },[dispatch,id])

    useEffect(()=>{
        setFilteredFiles(files.filter((file)=> key==='' || file.name.toLowerCase().indexOf(key)!==-1))
    },[key,files])

    return (
        <>
            <Header/>
            <div className='files'>
                <div className="files__container">
                    <div className="files__heading">
                        <h3>{name} Files</h3>
                        <IconButton aria-label="back" className='files__previousBtn' onClick={()=>history.push('/')}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    </div>
                    <div className="files__section">
                        {filteredFiles.map(file=>(
                            <File name={file.name} date={file.date} size={file.size} url={file.url} key={file.id} fileId={file.id}/>
                        ))}
                    </div>
                </div>
            </div>
            <Modal text='File Name' title='Upload File'/>
        </>
    )
}

export default Files
