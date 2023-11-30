import React from 'react'
import Workers from '../components/Workers';

let GetWorkers = ({match}) =>{

    let job = match.params.id

    return(
        <div>
            <Workers name = {job} />
        </div>
    )
}

export default GetWorkers