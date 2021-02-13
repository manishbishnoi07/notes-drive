import React from 'react'
import './File.css'
import {FcDocument} from 'react-icons/fc';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

const File = ({name,size,url,date,fileId}) => {
    const {id}=useParams()
    const checkDate=(date)=>{
        if(date==='Invalid Date'){
            return ''
        }
        return date
    }

    const getReadableFileSizeString = (fileSizeInBytes) => {
        let i = -1;
        const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };

    const deleteFile=()=>{
        db.collection("folders").doc(id)?.collection('files')?.doc(fileId)?.delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            alert("Error removing document: ", error);
        });
    }

    return (
        <div className="file__link">
            <a className='file' href={url} target="_blank" rel="noreferrer">
                    <div className="file__logo">
                        <FcDocument/>
                    </div>
                    <div className="file__info">
                        <div className="file__name">
                            <h4>{name}</h4>
                        </div>
                        <h5>{checkDate(new Date(date?.toDate()).toDateString())}</h5>
                        <h5>{getReadableFileSizeString(size)}</h5>
                    </div>
            </a>
            <IconButton className='delete' onClick={deleteFile}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}

export default File
