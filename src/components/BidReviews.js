import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'


let BidReviews = (props) => {

    let [reviews, setReviews] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(()=>{
        getReviews()
        // eslint-disable-next-line
    }, [])


    let getReviews = async () =>{
        let response = await fetch(`https://hireme.pythonanywhere.com/api/home/get/reviews/bids/${props.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
       let data = await response.json()
        setReviews(data)
    }
    return (
        <div>
            {
                reviews ?
                <div id = 'card'>
                    {reviews.map((review)=>(
                        <div className = 'card-content'>
                            <div key = {review.id}><h3>{review.sender}</h3>{review.value}</div>
                        </div>
                    ))}
                </div>
                :
                <p>no reviews are available yet</p>
            }
        </div>
    )
}

export default BidReviews