import React,{useState,useRef} from 'react'
import './Modal.css'
import Button from './Button'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {closeModal} from '../actions/modalActions'
import {useDispatch,useSelector} from 'react-redux'
import {db} from '../firebase'
import firebase from 'firebase/app'
import {useHistory, useParams} from 'react-router-dom'
import {storage} from '../firebase'
const Modal = ({text,title}) => {
    const {id}=useParams();
    const progressRef=useRef(null)
    const [name,setName]=useState('')
    const [file,setFile]=useState(null)
    const [disable,setDisable]=useState(false)
    const [disableClose,setDisableClose]=useState(false)
    const folders=useSelector(state=>state.folder)
    const open=useSelector(state=>state.modal)
    const {user} = useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const {location:{pathname}}=useHistory();
    
    const handleAdd=()=>{
        if(name===''){
            alert("Enter name of the folder")
            return
        }
        const idx=folders.findIndex(folder=> folder.name===name)
        if(idx!==-1){
            alert("Folder already exits")
            return
        }
        db.collection('folders').add({
            name,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            createdBy:user?.displayName 
        })
        setName('')
        dispatch(closeModal())
    }

    const handleUpload=()=>{
        if(file!==null && file!==undefined){
            setDisable(true)
            setDisableClose(true)
            const storageRef=storage.ref(`files/${file.name}`)
            const task=storageRef.put(file)
            task.on('state_changed',
                (snapshot)=>{
                    const percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    progressRef.current.style.display='block'
                    progressRef.current.style.width=`${percentage}%`
                    progressRef.current.innerHTML=`${Math.floor(percentage)}%`
                },
                (err)=>{
                    alert(err)
                    setDisableClose(false)
                },
                (snapshot)=>{
                    alert('File Uploaded')
                    storageRef.getDownloadURL().then(url=>{
                        db.collection('folders').doc(id).collection('files').add({
                            fileName:file.name,
                            size:file.size,
                            date:firebase.firestore.FieldValue.serverTimestamp(),
                            url,
                        })
                    })
                    .catch(err=>{
                        alert(err)
                    })
                    setDisableClose(false)
                }
            )
        }
    }
    const closeModel=()=>{
        setDisable(false)
        if(progressRef.current!==null){
            progressRef.current.style.width='0%'
            progressRef.current.innerHTML=``
            progressRef.current.style.display='none'
        }
        setName('')
        dispatch(closeModal())
    }

    return (
        <div className={`modal ${open===true?'open':''}`}>
            <div className='modal__content'>
                <form onSubmit={e=>e.preventDefault()}>
                    <IconButton className={`${disableClose===true?'disable':''} close`} onClick={closeModel}>
                        <CloseIcon/>
                    </IconButton>
                    <h3>{title}</h3>
                    {pathname==='/'?
                        <>
                            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder={text}/>
                            <Button type='submit' onClick ={handleAdd} text='Done'/>
                        </>:
                        <>
                            <input className='uploadInput'  onChange={(e)=>setFile(e.target.files[0])} type="file" id="docpicker" accept="image/*,.pdf,.doc,.docx,application/msword"/>
                            <div  ref={progressRef} className='progress'></div>
                            <Button type='button' className={`${disable===true?'disable':''}`}  onClick ={handleUpload} text='Upload'/>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}

export default Modal
