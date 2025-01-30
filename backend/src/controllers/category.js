import { database } from "../../db/db.js"
import { successResponse, errorResponse } from "../utils/response.handle.js"

const getCategories = async (req, res) => {
    try {
        const data = await database.query.categories.findMany()
        return successResponse(res, 'Categories fetched successfully!', data)
    } catch (error) {
        return errorResponse(res,error.message,500)
    }
   
}


export {
    getCategories
}