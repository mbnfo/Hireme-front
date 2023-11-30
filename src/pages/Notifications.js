import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './styles/notifications.css'
import NotificationsCounter from '../components/NotificationsCounter'
import { Link } from 'react-router-dom'

let Notifications = () => {

    let [notifications, setNotifications] = useState([])
    let [model_type, setModelType] = useState('')
    let {authTokens, logoutUser, user} = useContext(AuthContext)


    
    useEffect(()=>{
        GetNotifications()
        console.log('these functions were being called lmao')
        // eslint-disable-next-line
    }, [])
        
    let GetModelType = async () =>{
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
    
    let GetNotifications = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/notifications/get/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setNotifications(data)
            console.log(notifications)
            GetModelType()

        }else{
            logoutUser()
        }
    }


        return (
            <body>
            <header>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        {
                            model_type === 'worker'?
                                <li><Link to="/get/reciepts">Receipts</Link></li>
                            :
                                <li><Link to="/home/create/problem">Create problem</Link></li>
                        }
                        <li><NotificationsCounter className="active"/></li>
                        <li><Link onClick = {logoutUser} to = '/'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
            </header>
                
                <div id="main-content">
                <h2>{model_type} account,welcome {user.username}</h2>

                
                  <div id="notifications-section">
                  {
                    notifications !== [] ? 
                    notifications.map((notification)=>(
                        <div className="notification">
                          <h3 key = {notification.id}>Model id {notification.model_id}</h3>
                          <p>{notification.value}</p>
                        </div>
                    ))
                    :
                    null
                }
                  </div>

                </div>

            </body>

        )
    }


export default Notifications