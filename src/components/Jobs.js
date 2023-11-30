import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';

let Jobs = () => {

    let [job_models, setJobModels] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(()=>{
        getJobs()
        // eslint-disable-next-line
    }, [])


    let getJobs = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/jobs/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
       let data = await response.json()
        setJobModels(data)
    }
    return (
        <div>
            <select name = 'job'>
                {job_models.map((job)=>(
                    <option >
                        <p key = {job.id}>{job.name}</p>
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Jobs