import React,{ useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import moment from 'moment'

const Home = ()=> {

    const { setUserData, userData } = useContext(UserContext)
    const [jobs, setJobs] = useState([])

    console.log(userData.token)

      useEffect(()=>{
        const getData = async ()=> {
            
        await fetch('http://localhost:5000/api/users/jobs',{

            headers: {
                'x-auth-token':userData.token
              }
        })
        .then(res => res.json())
        .then(data => setJobs(data))
        
    }
    getData()

    return function cleanup() {
        setJobs([])
      }
    
    },[userData])  
        

    return(
        <div className="home"><div>{userData.user ? <h2>Your collection of jobs:</h2> : <h2>Home</h2>}
        {userData.user ? <p className="welcome-user"><span>Welcome back: <strong>{userData.user.name}!</strong></span><i class="fas fa-user"></i></p> : null}</div>
        <div className="wrapper">
        {jobs.length ? jobs.map(job => (<div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status=='Green' ? "status green" : "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>
            )): null}
            </div>
        </div>
    )
}

export default Home

//? "modal-active" : "modal"