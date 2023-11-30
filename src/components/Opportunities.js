import React, { useState,useEffect ,useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

let Opportunities = () =>{
    let {authTokens} = useContext(AuthContext)
    let [opportunity, setOpportunity] = useState([])

    useEffect(()=>{
        getOpportunities()
        // eslint-disable-next-line
    }, [])

    let getOpportunities = async () => {
        let response = await fetch (`https://hireme.pythonanywhere.com/api/home/get/problem/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setOpportunity(data)
        console.log(data)
    }

    return (
        <div>
            {
                opportunity ?
                <div>
                    {
                        opportunity.map((work)=>(
                            <div className = 'card'>
                                <div className = 'card-content'>
                                    <Link to = {`/home/opportunity/${work.id}`}>
                                        <p key = {work.id}>{work.description}</p>
                                        <div class="price">prefered offer __ R{work.price_range}</div>
                                    </Link>
                                </div>
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

export default Opportunities