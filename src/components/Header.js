import React from 'react'
import "./Header.css"
import {FiSearch} from "react-icons/fi"
import {useDispatch} from 'react-redux'
import {openModal} from '../actions/modalActions'
import { useHistory } from 'react-router-dom'
import { search } from '../actions/searchActions'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { IconButton } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
const Header = () => {
    const dispatch=useDispatch()
    return (
        <section>
            <div className="header">
                <div className="header__search">
                    <span><FiSearch/></span>
                    <input onKeyUp={(e)=>dispatch(search(e.target.value.toLowerCase()))} type="text" placeholder="Search"></input>
                </div>
                {useHistory().location.pathname==='/'?
                        <>  
                            <IconButton onClick={()=>dispatch(openModal())}>
                                <CreateNewFolderIcon/>
                            </IconButton>
                        </>:
                        <>
                            <IconButton onClick={()=>dispatch(openModal())}>
                                <NoteAddIcon/>
                            </IconButton>
                        </>
                    }
            </div>
        </section>
    )
}

export default Header
