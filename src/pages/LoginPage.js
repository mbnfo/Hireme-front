import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';
import './signin.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    let{loginUser} = useContext(AuthContext)
    return (
        <body>
            <div class="signin-container">
                <h1>Login</h1>
                <form onSubmit = {loginUser}>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text"  name="username" required/>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password"  name="password" required/>
                    </div>
                    <button type="submit" id="submit-button">Login</button>
                </form>
                <Link to = '/signin'>Don't have an account? signin</Link>
                <p>suggested testing account...name = fana...password = 123456789</p>
            </div>
        </body>
    )
}

export default LoginPage