import React,{ useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import UserContext from '../context/UserContext'
import NavLinks from '../context/NavContext'
import moment from 'moment'
import styled from 'styled-components'


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
    
    },[userData])  


    const handleModal = () => {
        setModaltoggle(prev => !prev )
        console.log('the modal is',modaltoggle)
        }

    useEffect(()=>{
        const modalUpdate = ()=> {

        }
    },[id])
       
    const H3 = styled.h3`
    background-image: url(${bgImage[Math.floor(Math.random() * bgImage.length)]});
    background-color: #cccccc; /* Used if the image is unavailable */
    height: 300px; /* You must set a specified height */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    color:white;
    border-radius: 10px;
    padding:1rem;

`

    const Span = styled.span`
    background-color: rgba(134, 69, 69,.5);
    padding:1rem;
    border-radius: 0 0 32px 8px;
`
const handleUpdate = ()=>{
    console.log('hi')
}

    return(
        <div className="home"><div>{userData.user ? <h2>Your collection of jobs:</h2> : <h2>Home</h2>}
        {userData.user ? <p className="welcome-user"><span>Welcome back: <strong>{userData.user.name}!</strong></span>{userData.user.avatar ? <img src={userData.user.avatar} className="avatar" /> : <span className="user-wrapper"><i class="fas fa-user"></i></span>}</p> : null}</div>
        <div className="wrapper">
        {jobs.length ? jobs.map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><Span className="job-title-rows">{job.title}</Span>
            <span className="dots"onClick={handleModal}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status=='Green' ? "status green" : job.status=='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>
            )): null}
            
            </div>
            <Modal class={modaltoggle} setModaltoggle={setModaltoggle} />
        </div>
    )

    
}


export default Home



//setId(job._id)

