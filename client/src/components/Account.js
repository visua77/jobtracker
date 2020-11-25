import React,{useContext,useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'


const Account = ()=> {

    const { setUserData, userData } = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        await fetch('http://localhost:5000/api/users/delete',{
            method:'DELETE',
            headers: { 
            'x-auth-token':userData.token }
        })
        
        history.push('/')
    }
    
    return(
        <div>
            <h2>Account</h2>
            <div>
            {userData.user  ? <p className="welcome-user"><span>Here is your information: <strong>{userData.user.name}!</strong></span>{userData.user.avatar ? <img src={userData.user.avatar} className="avatar" alt={userData.user.name}/> : <span className="user-wrapper"><i className="fas fa-user"></i></span>}</p> : null}
            </div>
            {userData.user ? <>
            <p><strong>ID:</strong> {userData.user.id}</p>
            <p><strong>Username:</strong> {userData.user.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${userData.user.email}`}className="a-mail">{userData.user.email}</a></p>
            <form>
                <input type="submit"value="Delete user"onClick={handleSubmit}></input>
            </form></> : null}
        </div>
    )
}

export default Account