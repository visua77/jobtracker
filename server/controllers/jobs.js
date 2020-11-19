import { auth } from '../middleware/auth.js'
import Job from '../models/jobs.js'

export const postJobs = async(req,res)=> {
    
     try{
        const {title, description, status} = req.body
        //validation
        if(!title){
            res.status(400).json({msg: "Not all fields has been entered."})
        }
        if(!description){
            res.status(400).json({msg: "Not all fields has been entered."})
        }
        if(!status){
            res.status(400).json({msg: "Not all fields has been entered."})
        }
        const newJob = new Job({
            title, 
            description,
            status, 
            userId: req.user
        })
        const savedJob = await newJob.save()
        res.json(savedJob)
    }catch (error){
            res.status(404).json({message:error.message})
    } 
}

export const getJobs = async (req,res)=> {
    const jobs = await Job.find({userId:req.user})
    res.json(jobs)
}

export const deleteJobs = async (req,res)=> {
    try{
        const job = await Job.findOne({userId:req.user, _id:req.params.id})
        if(!job){
            res.status(400).json({msg: "No job found with this ID that belongs to the current user."})
        }
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
        res.json(deletedJob)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
}
