import React, { useEffect , useState , useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Reciepts from '../components/Reciepts'
import NotificationsCounter from '../components/NotificationsCounter'
import { Link } from 'react-router-dom'

let GetReciept = () =>{
    let [model_type , setModelType] = useState('')
    let {user, logoutUser, authTokens} = useContext(AuthContext)

    
    useEffect(()=>{
        getModelType()
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
                <h2>{model_type} account,welcome {user.username}</h2>

                <Reciepts/>
            </div>
        </body>
    )
}

export default GetReciept