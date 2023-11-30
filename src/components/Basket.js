import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom'

let Basket = () => {

    let [consumer_basket, setConsumerBasket] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=>{
        getBasket()
        // eslint-disable-next-line
    }, [])

    let getBasket = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/basket/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setConsumerBasket(data)
        }else{
            logoutUser()
        }
    }
    return (
         <div>
                {consumer_basket ?
                    <div>
                    {consumer_basket.map((problem)=>(
                        <div>
                            <Link to = {`/home/problems/${problem.id}/${problem.available}`}>    
                                <div class="card">
                                    <div class="card-content" key = {problem.id}>     
                                        <div>{problem.description}</div>
                                        <div class="price">{problem.available === true? <p>unclaimed</p> : <p>claimed</p> }</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    </div>
                    :
                    null
                }
        </div>
    ) 
}

export default Basket
