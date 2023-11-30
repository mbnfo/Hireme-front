import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Jobs from '../components/Jobs'
import './styles/createproblem.css'
import NotificationsCounter from '../components/NotificationsCounter'
import { Link } from 'react-router-dom'

let CreateProblem = () =>{

    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let [job_id, setjobId] = useState(null)
    let [model_type, setModelType] = useState('')

    useEffect(()=>{
        getModelType()
        console.log(model_type)
        // eslint-disable-next-line 
    }, [])

    let problem = async (e) => {
        e.preventDefault()
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/create/problem/`, {
            method : 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            },
            body :JSON.stringify({'description': e.target.description.value, 'specialRequest':e.target.specialRequest.value, 'price':e.target.price.value, 'job': e.target.job.value})
        })

        let data = await response.json()
        setjobId(data)
        if(response.status === 200){
            if(job_id){
                window.location.href = `/home/get/workers/${job_id.job_type}`
            }
        }
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


    return(
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
                                <li><Link to="/home/create/problem" className="active">Create problem</Link></li>
                        }
                        <li><NotificationsCounter/></li>
                        <li><Link onClick = {logoutUser} to = '/'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        <div id="main-content">
        <h2>{model_type} account,welcome {user.username}</h2>

            <div id="form-section">
                <form onSubmit = {problem}>
                    <input type = 'text' name = 'description' placeholder="Description" required/>
                    <input type = 'text' name = 'specialRequest' placeholder="Special Request" required/>
                    <input type = 'number' name = 'price' placeholder="Price" required/>
                    <Jobs/>
                    <input type = 'submit'/>
                </form>
            </div>
        </div>
    </body>

    )
}

export default CreateProblem
//create a chruncbase type user interface for both types of users