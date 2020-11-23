import React,{useContext,useState} from 'react'
import UserContext from '../context/UserContext'

const Account = ()=> {

    
    const { setUserData, userData } = useContext(UserContext)
    
    
    return(
        <div><h2>Account</h2>
        <p className="welcome-user"><span>Here is your information: <strong>{userData.user.name}!</strong></span>{userData.user.avatar ? <img src={userData.user.avatar} className="avatar" /> : <span className="user-wrapper"><i class="fas fa-user"></i></span>}</p>
        <p>ID: {userData.user.id}</p>
        <p>Username: {userData.user.name}</p>
        <p>Email: <a href={`mailto:${userData.user.email}`}className="a-mail">{userData.user.email}</a></p></div>
    )
}

export default Account