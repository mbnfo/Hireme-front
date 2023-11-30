import React, { useState,useEffect ,useContext } from 'react'
import AuthContext from '../context/AuthContext'

let Candidate = (props) =>{
    let {authTokens} = useContext(AuthContext)
    let [candidate, setCandidate] = useState([])

    useEffect(()=>{
        getOpportunities()
        // eslint-disable-next-line
    }, [])

    let getOpportunities = async () => {
        let response = await fetch (`https://hireme.pythonanywhere.com/api/home/get/candidate/${props.id}/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setCandidate(data)
            console.log(data)

        }
    }

    return (
        <div>
            {
                candidate && 
                <div>
                    {
                        candidate.map((info)=>(
                            <div key = {info.id}>
                                <h5>{info.username}</h5>
                                <h5>{info.number}</h5>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )

}

export default Candidate