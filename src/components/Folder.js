import React from 'react'
import './Folder.css'
import {FaFolder} from 'react-icons/fa';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { db } from '../firebase';
const Folder = ({name,createdBy,folderId,onClick}) => {

    const deleteFolder=(e)=>{
        e.stopPropagation()
        db.collection("folders").doc(folderId)?.delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            alert("Error removing document: ", error);
        });
    }

    return (
        <div onClick={onClick} className='folder'>
            <div className="folder__top">
                <FaFolder/>
            </div>
            <div className="folder__bottom">
                <h4>{name}</h4>
                <p><span>Created by :</span> {createdBy}</p>
            </div>
            <IconButton className='delete' onClick={deleteFolder}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}

export default Folder
