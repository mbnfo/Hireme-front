import React, { useState,useEffect ,useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Basket from '../components/Basket'
import Opportunities from '../components/Opportunities'
import './styles/home.css'
import NotificationsCounter from '../components/NotificationsCounter'
import { Link } from 'react-router-dom'


const HomePage = () => {
    let {logoutUser, authTokens, user} = useContext(AuthContext)
    let [model_type, setModelType] = useState('')


    useEffect(()=>{
        getModelType()
        console.log(model_type)
        // eslint-disable-next-line 
    }, [])
    
    let getModelType = async () =>{
        let response = await fetch('https://hireme.pythonanywhere.com/api/get/model/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        setModelType(data)
    }

    return (
        <body>
            <header>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li><Link to="/" className="active">Home</Link></li>
                        {
                            model_type === 'worker'?
                                <li><Link to="/get/reciepts">Receipts</Link></li>
                            :
                                <li><Link to="/home/create/problem">Create problem</Link></li>
                        }
                        <li><NotificationsCounter/></li>
                        <li><Link onClick = {logoutUser} to = '/'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
            </header>
            
            <div id="main-content">
                <h2>{model_type} account,welcome {user.username}  {model_type === 'consumer'? <h5>...problems!</h5> : <h5>...opportunities!</h5>}</h2>

                {
                model_type === 'worker' ?
                <div>
                    <Opportunities/>
                </div> 
                : model_type === 'consumer'?
                <div>
                    <Basket/>
                </div>
            
                :
                <h4>it seems there is nothing on this pages</h4>
                }
            </div>
    </body>
    )
    
}
export default HomePage