// import { database } from "../../db/db.js";
// import { vehicles } from "../../db/schema/vehicles.js";
// import { eq, and, sql, inArray, count } from "drizzle-orm";
// import { successResponse, errorResponse } from "../utils/response.handle.js";

// const getVehicles = async (req, res) => {
//   try {
//     const { categoryId, manufacturerId, vehicleId, page = 1, limit = 10 } = req.query;
//     const currentPage = parseInt(page, 10);
//     const pageSize = parseInt(limit, 10);

//     let vehiclesData;
//     let totalVehicles = 0;

//     const vehicleConditions = [];

//     if (vehicleId) {
//       vehicleConditions.push(eq(vehicles.id, vehicleId));
//     }
//     if (categoryId) {
//       vehicleConditions.push(eq(vehicles.category_id, categoryId));
//     }
//     if (manufacturerId) {
//       const manufacturerIdsArray = Array.isArray(manufacturerId)
//         ? manufacturerId
//         : manufacturerId.split(",").map(Number);
//       vehicleConditions.push(inArray(vehicles.manufacturer_id, manufacturerIdsArray));
//     }

//     const totalCountResult = await database
//       .select({ count: count() })
//       .from(vehicles)
//       .where(and(...vehicleConditions));

//     totalVehicles = totalCountResult[0]?.count || 0;

//     vehiclesData = await database
//       .select()
//       .from(vehicles)
//       .where(and(...vehicleConditions))
//       .offset((currentPage - 1) * pageSize)
//       .limit(pageSize);

//     const totalPages = Math.ceil(totalVehicles / pageSize);
//     const startItem = (currentPage - 1) * pageSize + 1;
//     const endItem = Math.min(startItem + pageSize - 1, totalVehicles);

//     const queryParams = new URLSearchParams();
//     if (categoryId) queryParams.append("categoryId", categoryId);
//     if (manufacturerId) {
//       if (Array.isArray(manufacturerId)) {
//         manufacturerId.forEach((id) => queryParams.append("manufacturerId", id));
//       } else {
//         queryParams.append("manufacturerId", manufacturerId);
//       }
//     }
//     queryParams.append("limit", pageSize);

//     const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

//     const pagination = {
//       currentPage,
//         totalPages,
//       totalVehicles,
//       viewingRange: `Viewing ${startItem} to ${endItem} of ${totalVehicles}`,
//       nextPageLink:
//         currentPage < totalPages
//           ? `${baseUrl}?${queryParams.toString()}&page=${currentPage + 1}`
//           : null,
//       previousPageLink:
//         currentPage > 1
//           ? `${baseUrl}?${queryParams.toString()}&page=${currentPage - 1}`
//           : null,
//       firstPageLink: `${baseUrl}?${queryParams.toString()}&page=1`,
//       lastPageLink: `${baseUrl}?${queryParams.toString()}&page=${totalPages}`,
//     };

//     return successResponse(res, "Vehicles fetched successfully!", {
//       vehicles: vehiclesData,
//       pagination,
//     });
//   } catch (error) {
//     return errorResponse(res, error.message, 500);
//   }
// };

// export { getVehicles };



import { database } from "../../db/db.js";
import { vehicles } from "../../db/schema/vehicles.js";
import categories from "../../db/schema/category.js"; 
import manufacturers from "../../db/schema/manufacturer.js"; 
import { eq, and, inArray, count, like, ilike } from "drizzle-orm";
import { successResponse, errorResponse } from "../utils/response.handle.js";

// const getVehicles = async (req, res) => {
//   try {
//     const { categoryId, manufacturerId, vehicleId, keywords, page = 1, limit = 20 } = req.query;
//     const currentPage = parseInt(page, 20);
//     const pageSize = parseInt(limit, 20);
//     // console.log("Keywords", keywords)

//     let vehiclesData;
//     let totalVehicles = 0;

//     const vehicleConditions = [];

//     if (vehicleId) {
//       vehicleConditions.push(eq(vehicles.id, vehicleId));
//     }
//     if (categoryId) {
//       vehicleConditions.push(eq(vehicles.category_id, categoryId));
//     }
//     if (keywords && keywords.trim() !== "") {
//       vehicleConditions.push(ilike(vehicles.name, `%${keywords}%`)); // Add a LIKE condition for matching titles
//       console.log(vehicleConditions)
//     }
//     if (manufacturerId) {
//       const manufacturerIdsArray = Array.isArray(manufacturerId)
//         ? manufacturerId
//         : manufacturerId.split(",").map(Number);
//       vehicleConditions.push(inArray(vehicles.manufacturer_id, manufacturerIdsArray));
//     }

//     const totalCountResult = await database
//       .select({ count: count() })
//       .from(vehicles)
//       .where(and(...vehicleConditions));

//     totalVehicles = totalCountResult[0]?.count || 0;

//     vehiclesData = await database
//       .select()
//       .from(vehicles)
//       .innerJoin(categories, eq(categories.id, vehicles.category_id))
//       .innerJoin(manufacturers, eq(manufacturers.id, vehicles.manufacturer_id))
//       .where(and(...vehicleConditions))
//       .offset((currentPage - 1) * pageSize)
//       .limit(pageSize);

//       const formattedVehicles = vehiclesData.map(vehicle => ({
//           id: vehicle.vehicles.id,
//           name: vehicle.vehicles.name,
//           condition: vehicle.vehicles.condition,
//           horsePower: vehicle.vehicles.horsepower,
//           hoursMeter: vehicle.vehicles.hoursMeter,
//           stockNumber: vehicle.vehicles.stockNumber,
//           year: vehicle.vehicles.year,
//           serialNumber: vehicle.vehicles.serialNumber,
//           model: vehicle.vehicles.model,
//           description: vehicle.vehicles.description,
//           images: vehicle.vehicles.images,
//           categoryId: vehicle.vehicles.category_id,
//           categoryTitle: vehicle.categories.title,
//           manufacturerId: vehicle.vehicles.manufacturer_id,
//           manufacturerTitle: vehicle.manufacturers.title,
//       }));

//     const totalPages = Math.ceil(totalVehicles / pageSize);
//     const startItem = (currentPage - 1) * pageSize + 1;
//     const endItem = Math.min(startItem + pageSize - 1, totalVehicles);

//     const queryParams = new URLSearchParams();
//     if (categoryId) queryParams.append("categoryId", categoryId);
//     if (manufacturerId) {
//       if (Array.isArray(manufacturerId)) {
//         manufacturerId.forEach((id) => queryParams.append("manufacturerId", id));
//       } else {
//         queryParams.append("manufacturerId", manufacturerId);
//       }
//     }
//     queryParams.append("limit", pageSize);

//     const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

//     const pagination = {
//       currentPage,
//       totalPages,
//       totalVehicles,
//       viewingRange: `Viewing ${startItem} to ${endItem} of ${totalVehicles}`,
//       nextPageLink:
//         currentPage < totalPages
//           ? `${baseUrl}?${queryParams.toString()}&page=${currentPage + 1}`
//           : null,
//       previousPageLink:
//         currentPage > 1
//           ? `${baseUrl}?${queryParams.toString()}&page=${currentPage - 1}`
//           : null,
//       firstPageLink: `${baseUrl}?${queryParams.toString()}&page=1`,
//       lastPageLink: `${baseUrl}?${queryParams.toString()}&page=${totalPages}`,
//     };

//     return successResponse(res, "Vehicles fetched successfully!", {
//       vehicles: formattedVehicles,
//       pagination,
//     });
//   } catch (error) {
//     return errorResponse(res, error.message, 500);
//   }
// };
const getVehicles = async (req, res) => {
  try {
    const { categoryId, manufacturerId, vehicleId, keywords, page = 1, limit = 20 } = req.query;
    let currentPage = parseInt(page, 10); // Parse page number
    const pageSize = parseInt(limit, 20); // Parse limit
    let totalVehicles = 0;

    const vehicleConditions = [];

    // Add conditions based on query parameters
    if (vehicleId) {
      vehicleConditions.push(eq(vehicles.id, vehicleId));
    }
    if (categoryId) {
      vehicleConditions.push(eq(vehicles.category_id, categoryId));
    }
    if (keywords && keywords.trim() !== "") {
      vehicleConditions.push(ilike(vehicles.name, `%${keywords}%`));
    }
    if (manufacturerId) {
      const manufacturerIdsArray = Array.isArray(manufacturerId)
        ? manufacturerId
        : manufacturerId.split(",").map(Number);
      vehicleConditions.push(inArray(vehicles.manufacturer_id, manufacturerIdsArray));
    }

    // Fetch total vehicle count
    const totalCountResult = await database
      .select({ count: count() })
      .from(vehicles)
      .where(and(...vehicleConditions));

    totalVehicles = totalCountResult[0]?.count || 0;

    // Calculate total pages
    const totalPages = Math.ceil(totalVehicles / pageSize);

    // Validate the current page
    if (currentPage > totalPages) {
      currentPage = totalPages; // Adjust to the last valid page
    }

    // If no vehicles should be fetched, return an empty result
    if (totalVehicles === 0 || currentPage < 1) {
      return successResponse(res, "No vehicles found!", {
        vehicles: [],
        pagination: {
          currentPage,
          totalPages,
          totalVehicles,
          viewingRange: "No vehicles to display",
          nextPageLink: null,
          previousPageLink: null,
          firstPageLink: null,
          lastPageLink: null,
        },
      });
    }

    // Fetch vehicles for the current page
    const vehiclesData = await database
      .select()
      .from(vehicles)
      .innerJoin(categories, eq(categories.id, vehicles.category_id))
      .innerJoin(manufacturers, eq(manufacturers.id, vehicles.manufacturer_id))
      .where(and(...vehicleConditions))
      .offset((currentPage - 1) * pageSize)
      .limit(pageSize);

    const formattedVehicles = vehiclesData.map((vehicle) => ({
      id: vehicle.vehicles.id,
      name: vehicle.vehicles.name,
      condition: vehicle.vehicles.condition,
      horsePower: vehicle.vehicles.horsepower,
      hoursMeter: vehicle.vehicles.hoursMeter,
      stockNumber: vehicle.vehicles.stockNumber,
      year: vehicle.vehicles.year,
      serialNumber: vehicle.vehicles.serialNumber,
      model: vehicle.vehicles.model,
      description: vehicle.vehicles.description,
      images: vehicle.vehicles.images,
      categoryId: vehicle.vehicles.category_id,
      categoryTitle: vehicle.categories.title,
      manufacturerId: vehicle.vehicles.manufacturer_id,
      manufacturerTitle: vehicle.manufacturers.title,
    }));

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, totalVehicles);

    // Generate query params
    const queryParams = new URLSearchParams();
    if (categoryId) queryParams.append("categoryId", categoryId);
    if (manufacturerId) {
      if (Array.isArray(manufacturerId)) {
        manufacturerId.forEach((id) => queryParams.append("manufacturerId", id));
      } else {
        queryParams.append("manufacturerId", manufacturerId);
      }
    }
    queryParams.append("limit", pageSize);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    // Generate pagination links
    const pagination = {
      currentPage,
      totalPages,
      totalVehicles,
      viewingRange: `Viewing ${startItem} to ${endItem} of ${totalVehicles}`,
      nextPageLink:
        currentPage < totalPages
          ? `${baseUrl}?${queryParams.toString()}&page=${currentPage + 1}`
          : null,
      previousPageLink:
        currentPage > 1
          ? `${baseUrl}?${queryParams.toString()}&page=${currentPage - 1}`
          : null,
      firstPageLink: `${baseUrl}?${queryParams.toString()}&page=1`,
      lastPageLink: `${baseUrl}?${queryParams.toString()}&page=${totalPages}`,
    };

    // Send response
    return successResponse(res, "Vehicles fetched successfully!", {
      vehicles: formattedVehicles,
      pagination,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export { getVehicles };
