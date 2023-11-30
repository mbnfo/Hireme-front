import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

let NotificationsCounter = () =>{
    let [notifications, setNotifications] = useState([])
    let {authTokens} = useContext(AuthContext)

   
    useEffect(()=>{
        GetNotifications()
        console.log('these functions were being called lmao')
        // eslint-disable-next-line
    }, [])
        
    let GetNotifications = async() =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/notifications/count/`,{
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setNotifications(data)
            console.log(notifications)
        }
    }

    return (
        <div>
            <Link to="/home/get/notifications" >Notifications({
                notifications ?
                notifications.length
                :
                0
            })</Link>
        </div>
    )
}

export default NotificationsCounter