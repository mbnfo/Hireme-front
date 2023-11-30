import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

let Workers = (props) =>{

    let {authTokens} = useContext(AuthContext)
    let [employees, setEmployees] = useState(null)

    useEffect (()=>{
        fetchWorkers()
        // eslint-disable-next-line
    }, [])

    let fetchWorkers = async () =>{
        let response = await fetch (`https://hireme.pythonanywhere.com/api/home/get/workers/${props.name}/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setEmployees(data)
            console.log(data)
        }
    }
    
    return (
        <div>
        {
            employees !== null?
            <div>
                {
                    employees.workers.map((work)=>(
                        <div>
                            <Link to = {`/home/opportunity/${work}`}>
                                <p key = {work}>{work}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
            :
            <p>Its seems there are no oppportunities yet, please check later!</p>
        }
        </div>
    )
}
//we reroute to the opportunity link and no wi must try to get the job rl and place a bid and see if this user accpets it}

export default Workers