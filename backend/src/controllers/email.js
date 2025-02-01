// code for uploading on our own server
// import fs from 'fs';
// import path from 'path';
// import multer from 'multer';
// import { fileURLToPath } from 'url';
import { successResponse, errorResponse } from "../utils/response.handle.js";
import sendEmail from "../utils/sendEmail.js";
import { onFavouriteEmail, onVehicleSaleEmail, onContactEmail, onBuyEmail } from "../utils/emailTemplate.js";
import { BASE_URL, RECEIPIENT_EMAIL } from "../utils/constants.js";
import { upload_file } from '../utils/cloudinary.js';

// code for uploading on our own server

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

// if (!fs.existsSync(uploadsDir)) {
//   try {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//     console.log('Uploads directory created:', uploadsDir);
//   } catch (err) {
//       console.error("Failed to create uploads directory:", err);
//     process.exit(1);
//   }
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only JPEG, PNG, and JPG files are allowed.'));
//     }
//   },
// }).array('images', 3);



const onVehicleSale = async (req, res) => {
  try {
    // upload(req, res, async (err) => {
    //   if (err) {
    //     return errorResponse(res, err.message, 400);
    //   }

        const { fullName, phone, email, vehicleLocation, make, model, year, price } = req.body;

        // code for uploading images on our server
        //   const uploadedImages = req.files.map((file) => `${BASE_URL}/uploads/${file.filename}`);
        const files = Array.isArray(req.files) ? req.files : [req.files];
    //code for upload on claudinary
    if (req.file) {
      return errorResponse
    }
        const uploader = async (image) => upload_file(image, "/machinerytrader/vehicle_images");
        const urls = await Promise.all(files.map(file => uploader(file.path)));
        const uploadedImages = urls.map((file) => file.url);

      const emailContent = onVehicleSaleEmail(
        fullName,
        phone,
        email,
        vehicleLocation,
        make,
        model,
        year,
        price,
        uploadedImages
        );
  
      await sendEmail("Vehicle Sale Request", emailContent, RECEIPIENT_EMAIL);

      return successResponse(res, 'Email sent with user and vehicle details, including images.', {
        uploadedImages,
      });
    // });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const onFavourite = async (req, res) => {
    try {
        const { userEmail, vehicleId } = req.body
        const vehicleUrl = `${BASE_URL}/vehicles/${vehicleId}`
        const emailContent = onFavouriteEmail(userEmail,vehicleUrl, RECEIPIENT_EMAIL);
        await sendEmail("Favourite Vehicle", emailContent, RECEIPIENT_EMAIL);
        return successResponse(res, 'Email sent with user and vehicle details', {})
    } catch (error) {
        return errorResponse(res,error.message,500)
    }
}

const onContact = async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;
      const emailContent = onContactEmail(fullName, email, subject, message, RECEIPIENT_EMAIL);
      await sendEmail("New Contact Us Form Submission", emailContent, RECEIPIENT_EMAIL);
      return successResponse(res, 'Your message has been sent successfully. We will get back to you shortly.', {});
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
};
  
const onBuy = async (req, res) => {
    try {
        const { userEmail, vehicleId } = req.body
        const vehicleUrl = `${BASE_URL}/vehicles/${vehicleId}`
        const emailContent = onBuyEmail(userEmail,vehicleUrl, RECEIPIENT_EMAIL);
        await sendEmail("New Buy Equipment Form Submission", emailContent, RECEIPIENT_EMAIL);
        return successResponse(res, 'Query Submitted. We will contact you soon.', {})
    } catch (error) {
        return errorResponse(res,error.message,500)
    }
}

export { onFavourite, onVehicleSale, onContact, onBuy };
