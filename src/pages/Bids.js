import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import NotificationsCounter from '../components/NotificationsCounter'
import Bidinfo from '../components/BidInfo'
import { Link } from 'react-router-dom'


let Bids = ({match}) =>{

    let problem_id = match.params.id
    let availability_query = match.params.available
    let {authTokens, user, logoutUser} = useContext(AuthContext)
    let [model_type, setModelType] = useState('')

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
                        <li><Link to="/">Home</Link></li>
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
            <div id = 'main-content'>
            <h2>{model_type} account, welcome {user.username}{availability_query === 'false' ? <p>problem sechedule</p> : <p>...bids</p> }</h2>

                <div>
                    <Bidinfo id = {problem_id} available = {availability_query}/>
                </div>
        </div>

        </body>
    )
}
//use worker_bid.bidder to get the worker id and redirect
export default Bids