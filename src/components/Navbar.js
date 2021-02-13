import React from 'react'
import "./Navbar.css"
import { Avatar, Button } from '@material-ui/core';
import { TiCloudStorage } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';

const Navbar = () => {
    const {user}=useSelector(state=>state.auth)
    
    return (
        <nav>
            <div className="navbar">

                {/* Navbar Left Section */}
                <div className="navbar__left">
                    <span><TiCloudStorage/></span>
                    <h3>Notes Drive</h3>
                </div>

                {/* Navbar Right Section */}
                <div className="navbar__right">
                    <Button onClick={()=>auth.signOut()}>Sign Out</Button>
                    <Avatar className='avatar' alt="profile" src={user?.photoURL} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
