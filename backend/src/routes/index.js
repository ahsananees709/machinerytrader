import express from 'express'
import categoryRoutes from './category.js'
import manufacturerRoutes from './manufacturer.js'
import vehicleRoutes from './vehicle.js'
import emailRoutes from './email.js'



const router = express.Router()

router.use('/category', categoryRoutes)
router.use('/manufacturer', manufacturerRoutes)
router.use('/vehicle', vehicleRoutes)
router.use('/email', emailRoutes)

export default router

