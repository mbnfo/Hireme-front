import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './signin.css'
import { Link } from 'react-router-dom'
const Signin = () =>{

let {signinUser} = useContext(AuthContext)
    return (
        <body>
            <div class="signin-container">
                <h1>Sign In</h1>
                <form onSubmit = {signinUser}>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text"  name="username" required/>
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="text"  name="email" required/>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password"  name="password" required/>
                    </div>
                    <button type="submit" id="submit-button">Sign In</button>
                </form>
                <Link to = '/login'>already have an account? login</Link>
            </div>
        </body>
    )
}
export default Signin