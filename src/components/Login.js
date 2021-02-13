import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import { auth, provider } from '../firebase'
const Login = () => {
    
    const signInHandler=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            console.log('Logged In')
        })
        .catch(err=>alert(err))
    }

    return (
        <div className='login'>
            <div className="login__container">
                <img src="http://www.uv.es/recursos/fatwirepub/ccurl/638/460/1200x630bb.png" alt="drive logo"/>
                <div className="login_text">
                    <h1>Sign In to Notes Drive</h1>
                </div>
                <Button onClick={signInHandler}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
