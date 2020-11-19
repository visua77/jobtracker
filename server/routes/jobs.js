import express from 'express'
import { getJobs,postJobs,deleteJobs } from '../controllers/jobs.js'
import { auth } from '../middleware/auth.js'
const router = express.Router()

router.post('/',auth, postJobs)
router.get('/',auth, getJobs)
router.delete('/:id',auth, deleteJobs)

export default router

