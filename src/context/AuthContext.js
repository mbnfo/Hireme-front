import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext() 
export default AuthContext



export const AuthProvider = ({children}) =>{


    let[authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let[user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

//this is for authentification

    useEffect(()=>{
        let fourMinutes = 1000 * 60 * 4
        let  interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
            },fourMinutes)
        return ()=> clearInterval(interval)
        // eslint-disable-next-line
          },[authTokens])

    let login = (data) => {
        setAuthTokens(data)
        console.log(authTokens)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
    }

    let loginUser = async (e) =>{
        e.preventDefault()
         let response = await fetch('https://hireme.pythonanywhere.com/api/token/',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value }),
        })
        let data = await response.json()
        if(response.status === 200){
            login(data)
            window.location.href= '/' 
            console.log(data)
        }
        else{
            alert('something went wrong')
        }
    }

    let signinUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://hireme.pythonanywhere.com/api/create/user/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value, 'email': e.target.email.value})
        })
        if(response.status === 200){

        //if the response is 200 then i want to login the user
            let login_response = await fetch('https://hireme.pythonanywhere.com/api/token/',{
               method : 'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value }),
           })
           let data = await login_response.json()
           if(response.status === 200){
               login(data)
               window.location.href= '/settings' 
           }
           else{
               alert('something went wrong')
           }
        }
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        window.location.href= '/login' 
    }

    let updateToken = async () =>{
        let response = await fetch('https://hireme.pythonanywhere.com/api/token/refresh/',{
           method : 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({'refresh':authTokens && authTokens.refresh})
       })
       let data = await response.json()
       console.log(data)
       if (response.status === 200){
           setAuthTokens(data)
           setUser(jwt_decode(data.access))
           localStorage.setItem('authTokens', JSON.stringify(data))
           console.log('this is working lol')
       }else{
           logoutUser()
       }
    }

    let contextData = {
        signinUser:signinUser,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens, 
    }

    return (
        <AuthContext.Provider value = {contextData}>
        {children}
        </AuthContext.Provider>
    )
}




//js-cookies has to be installed using the npm packages and also the jwt-decode in order for us to decode the increypted user data