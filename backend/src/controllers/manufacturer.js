import { database } from "../../db/db.js"
import { successResponse, errorResponse } from "../utils/response.handle.js"
import manufacturers from "../../db/schema/manufacturer.js"
import categoryManufacturer from "../../db/schema/categoryManufacturer.js"
import { eq } from "drizzle-orm"

const getManufacturers = async (req, res) => {
    try {
        const {categoryId} = req.query
        let manufacturersData
        if (categoryId) {
        manufacturersData = await database
        .select({
            id: manufacturers.id,
            title: manufacturers.title,
          })
        .from(manufacturers)
        .innerJoin( categoryManufacturer, eq(categoryManufacturer.manufacturer_id, manufacturers.id)
        )
        .where(eq(categoryManufacturer.category_id, categoryId));
        }
        else {
            manufacturersData = await database.query.manufacturers.findMany()
        }
        return successResponse(res,'Manufacturers fetched successfully!',manufacturersData)
    } catch (error) {
        return errorResponse(res,error.message,500)
    }
}

export {
    getManufacturers
}

  