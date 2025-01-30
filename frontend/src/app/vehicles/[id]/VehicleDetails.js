"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VehicleDetails = ({ vehicle }) => {
  const description = vehicle.description || "";
//   const features = description ? description.split('/,(?!\d)/)').map(feature => feature.trim()) : [];
  const features = description.split(/,(?!\d)/).map(item => item.trim());
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{vehicle.name}</h1>
        <p className="text-sm text-gray-600 mt-2">
          {vehicle.city}
        </p>
        <p className="text-sm text-gray-600 mt-2">{vehicle.categoryTitle}/{vehicle.manufacturerTitle}</p>
      </div>

      <div className="mb-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full rounded-lg overflow-hidden"
              >
                  {vehicle.images?.map((img, index) => {
      const modifiedImg = img.replace(/350|220/g, '');

      return (
        <SwiperSlide key={index}>
          <img
            src={modifiedImg}
            alt={`${vehicle.title} - ${index + 1}`}
            className="w-full object-contain h-96 rounded-lg"
          />
        </SwiperSlide>
      );
    })}  

        </Swiper>
      </div>

      <div className="border-t-2 border-gray-300 my-6"></div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>
        <table className="w-full table-auto border-collapse">
    
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Title</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Model</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.model}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Year</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.year}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Condition</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.condition}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Horse Power</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.horsePower}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Horse Meter</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.horseMeter}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Stock Number</td>
              <td className="px-4 py-2 border border-gray-300">{vehicle.stockNumber}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium align-top">Description</td>
              <td className="px-4 py-2 border border-gray-300">
 
                {features.length > 0 ? (
                  <ul className=" py-2 list-inside list-disc">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 py-1">
                        <span className="mr-2 text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No description available.</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VehicleDetails;
