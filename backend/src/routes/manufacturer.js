import express from 'express'
import { getManufacturers } from '../controllers/manufacturer.js'



const router = express.Router()

router.get('/', getManufacturers)


export default router

