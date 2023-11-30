import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Candidate from './Candidate';
import { Link } from 'react-router-dom'


let Bidinfo = (props) =>{

    let [info, setInfo] = useState([])
    let [cancel , setCancelled] = useState(false)
    let {authTokens} = useContext(AuthContext)

    useEffect(()=>{
        getInfo()
        // eslint-disable-next-line
    }, [])
    let getInfo = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/bids/${props.id}/`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){}
        setInfo(data)
        console.log(info)
    }

    let cancelReciept = () =>{
        setCancelled(!cancel)
        console.log(info.id)
    }

    let cancelViewer = async () =>{
        await fetch(`https://hireme.pythonanywhere.com/api/home/problem/reciept/cancel/${props.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            } 
        })
        window.location.href = '/'
    }
    return (
        <div>
            {
                props.available === 'false'?
                <div className = 'card'>
                {
                    info ? 
                    <div>
                        {info.map((information)=>(
                            <div key = {information.id}>
                                <h3>Schedule Information</h3><Candidate id = {information.id}/>
                                <p>and the value is R{information.price}</p>
                                <p>at the scheduled date of : {information.scheduled_date}</p>
                                {
                                    !cancel ?
                                    <button onClick = {cancelReciept}>
                                        Cancel
                                    </button>
                                    :
                                    <div>
                                        are you sure
                                        <button onClick = {cancelViewer}>
                                            yes
                                        </button>
                                        <button onClick = {cancelReciept}>
                                            no
                                        </button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    :
                    <p>It seem there is nothing interesting on this page :(</p>
                }
                </div>
                :
                <div>
                   {info.map((information)=>(
                        <div>
                            <Link to = {`/problem/${props.id}/bidder/${information.id}`}  key = {information.id}>
                                <div className = 'card'>
                                <div className = 'card-content'>
                                    <h3> a bid of R{information.value} has been placed on the job...click for more info!</h3>
                                    <h4>Important info:</h4>
                                    <p>{information.note}</p>
                                </div>
                                </div>
                            </Link>
                        </div>
                    ))} 
                </div>
            }
            <div>
                
            </div>
        </div>
    )
}

export default Bidinfo