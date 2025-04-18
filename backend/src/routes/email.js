import express from 'express'
import { onFavourite } from '../controllers/email.js'
import { onVehicleSale } from '../controllers/email.js'
import { onContact } from '../controllers/email.js'
import { onBuy } from '../controllers/email.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' });


const router = express.Router()

router.post('/favourite', onFavourite)
router.post('/vehicle-sale', upload.array('images', 3), onVehicleSale)
router.post('/contact-us', onContact)
router.post('/buy-now', onBuy)


export default router

