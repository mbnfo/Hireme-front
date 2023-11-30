import React, { useState,useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './signin.css'
import Jobs from '../components/Jobs.js'

let Settings = () => {

    let [is_worker, setIsWorker] = useState(false)
    let [file, setFile] = useState(null)
    let {authTokens, user} = useContext(AuthContext)


    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    let send_settings = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('job', e.target.job.value);
        formData.append('file', file);
        formData.append('num', e.target.number.value);
        formData.append('bio', e.target.bio.value);
        formData.append('is_worker', is_worker.toString());
    
        await fetch(`https://hireme.pythonanywhere.com/api/create/user/settings/${is_worker}/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
            body: formData,
        });
        window.location.href = '/'
    };
    

    return (
        <div className="signin-container">
            <h2>Settings for {user.username}</h2>
            <div className = 'input-group'>
                <button onClick = {(()=>setIsWorker(!is_worker))} id = 'consumer_worker_button'>{
                    is_worker ? 
                    <div className = 'cards'>
                        <h3>Worker</h3>
                    </div>
                    :
                    <div className = 'cards'>
                        <h3>Consumer</h3>
                    </div>
                }
                    <p>click to change options</p>
                </button>
            </div>
            <form onSubmit = {send_settings}>
                <div class="input-group">
                    <label for="username">Number</label>
                    <input type="text"  name="number" required/>
                </div>
                <div class="input-group">
                    <label for="bio">Bio</label>
                    <input type="text"  name="bio" required/>
                </div>
                {
                    is_worker ?
                    <div className = 'input-group'>
                        <Jobs/>
                        <input type = 'file' name = 'cv' onChange = {handleFileChange} required/>
                    </div>
                    :
                    null
                }
        
                <div class="input-group">
                    <button type="submit" id="submit-button">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Settings