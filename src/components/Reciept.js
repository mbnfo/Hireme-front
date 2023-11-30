import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';

let Reciept = () =>{

    let {authTokens} = useContext(AuthContext)
    let [reciept, setReciept] = useState([])

    useEffect(()=>{
        fetchReciept
    }, [])

    let fetchReciept = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/reciept/${worker_id}/`, {
            method: 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + String(authTokens)
            }
        })
        let data = await response.json()
        setReciept(data)
    }
    
    return(
        <div>
            {reciept && 
                <div>
                    <p>{reciept}</p>
                </div>
            }
        </div>
    )
}

export default Reciept