import React,{ useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Modal from './Modal'
import UserContext from '../context/UserContext'
import NavLinks from '../context/NavContext'
import moment from 'moment'


const Home = ()=> {

    const [bgImage, setBgImage] = useState(['http://localhost:3000/img/1.jpg','http://localhost:3000/img/2.jpg','http://localhost:3000/img/3.jpg','http://localhost:3000/img/4.jpg','http://localhost:3000/img/5.jpg','http://localhost:3000/img/6.jpg','http://localhost:3000/img/7.jpg','http://localhost:3000/img/8.jpg','http://localhost:3000/img/9.jpg','http://localhost:3000/img/10.jpg','http://localhost:3000/img/11.jpg'])

    const { setUserData, userData } = useContext(UserContext)
    const { navLinks, setNavLinks } = useContext(NavLinks)
    setNavLinks('All')
    const [jobs, setJobs] = useState([])
    const [id, setId] = useState()
    const [count, setCount] = useState(0)
    const[modaltoggle, setModaltoggle] = useState(false)
    console.log('our id is:',id)

    console.log(userData)
    //console.log("avatar:",userData.user.avatar)

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
    
    },[userData,modaltoggle])  


    useEffect(()=>{
        const modalUpdate = ()=> {

        }
    },[id])
       

    const handleModal = () => {
        setModaltoggle(prev => !prev )
        console.log('toggle is',modaltoggle)
        
    }

    return(
        <div className="home"><div>{userData.user ? <h2>Your collection of jobs:</h2> : <h2>Home</h2>}
        {userData.user ? <p className="welcome-user"><span>Welcome back: <strong>{userData.user.name}!</strong></span>
        <span className="no-jobs">you have <strong>{jobs.length} jobs</strong> in your collection!</span>{userData.user.avatar ? <Link to="/account"><img src={userData.user.avatar} className="avatar"onClick={()=>setNavLinks('Acc')} /></Link> : <Link to="/account"><span className="user-wrapper"><i className="fas fa-user"onClick={()=>setNavLinks('Acc')}></i></span></Link>}</p> : null}</div>
        <div className="wrapper">
        {jobs.length ? jobs.map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            <span className="dots"onClick={()=>{handleModal()
            setId(job._id)}}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>
            )): null}
            
            </div>
            <Modal class={modaltoggle} setModaltoggle={setModaltoggle} id={id} />
        </div>
    )

    
}


export default Home



//setId(job._id)

