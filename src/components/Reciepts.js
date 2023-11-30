import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';

let Reciepts = () =>{

    let {authTokens} = useContext(AuthContext)
    let [reciepts, setReciepts] = useState([])

    useEffect(()=>{
        fetchReciepts()
        // eslint-disable-next-line
    }, [])

    let fetchReciepts = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/worker/reciepts/`, {
            method: 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setReciepts(data)
        console.log(data)
    }
    
    return(
        <div>
            {reciepts ? 
                <div>
                    {
                        reciepts.map((reciept)=>(
                            <p>{reciept.work}</p>
                        ))
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default Reciepts