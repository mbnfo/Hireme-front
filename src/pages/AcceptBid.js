import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Candidate from '../components/Candidate'
import BidReviews from '../components/BidReviews'
import NotificationsCounter from '../components/NotificationsCounter'
import './styles/bidsection.css'
import { Link } from 'react-router-dom'

let AcceptBid = ({match}) =>{

    let prob_id = match.params.problem_id
    let bid_id = match.params.id
    let {authTokens,user, logoutUser} = useContext(AuthContext)
    let [bid , setBid] = useState([])
    let [model_type, setModelType] = useState('')


    useEffect(()=>{
        getBid()
        // eslint-disable-next-line
    }, [])

    let getBid = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/bids/bid/${bid_id}/`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setBid(data)
            getModelType()
            console.log(prob_id)

        }
    }


    let accept = async () =>{
        await fetch(`https://hireme.pythonanywhere.com/api/home/problem/bid/accept/`, {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body : JSON.stringify({'prob_id': prob_id, 'bid_id':bid_id, 'price': bid.value, })
            })
            console.log('the bid is being accepted')
            window.location.href = '/'
    }

    let reject = async () =>{
        await fetch(`https://hireme.pythonanywhere.com/api/home/problem/bid/reject/`, {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body : JSON.stringify({'prob_id': prob_id, 'bid_id':bid_id, 'price': bid.value, })
            })
            console.log('the bid is being accepted')
            window.location.href = '/'
    }
           


        
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
            <h2>{model_type} account,welcome {user.username}</h2>

                <div id="bid-section">
                    <h3><Candidate id = {bid_id}/>  has submitted a bid.</h3>
                    <h4>other information</h4>
                    <p>date proposed : {bid.scheduled_date}</p>
                    <p>proposed price : R{bid.value}</p>
                    {console.log(bid)}
                    <div>
                        <button onClick = {accept}>accept offer</button>
                        <button onClick = {reject}>reject offer</button>
                    </div>
                    <div id="reviews-section">
                        <h2>Reviews</h2>
                        <div class="review">
                            <BidReviews id = {bid_id}/> 
                        </div>
                    </div>

                </div>
            </div>

        </body>
    )
}

export default AcceptBid