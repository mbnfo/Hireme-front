import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import NotificationsCounter from '../components/NotificationsCounter'
import { Link } from 'react-router-dom'

let CreateBid = ({match}) => {

    let problem_id = match.params.id
    let {authTokens, user, logoutUser} = useContext(AuthContext)
    let [model_type, setModelType] = useState('')

    useEffect(()=>{
        getModelType()
        // eslint-disable-next-line
    }, [])

    let create = async (e) => {
        e.preventDefault()
        await fetch(`https://hireme.pythonanywhere.com/api/home/create/bid/${problem_id}/`, {
            method : 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            },
            body :JSON.stringify({'value':e.target.val.value, 'notes': e.target.notes.value, 'date':e.target.scheduled_date.value})
        })
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

                <div id="form-section">
                    <form onSubmit = {create}>
                        <input type = 'number' name = 'val' placeholder = 'Value' required />
                        <input type = 'text' name = 'notes' placeholder = 'Notes' required />
                        <input type = 'datetime-local' name = 'scheduled_date' required />
                        <input type = 'submit' />
                    </form>
                </div>
            </div>
        </body>
    )
}

export default CreateBid