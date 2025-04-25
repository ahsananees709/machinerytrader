"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VehicleDetails = ({ vehicle }) => {
  const description = vehicle.description || "";
  const features = description.split(/,(?!\d)/).map(item => item.trim());

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Side - Vehicle Information */}

      {/* Right Side - Image Gallery */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-4">
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
      </div>

      <div className="w-full md:w-1/2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{vehicle.name}</h1>
          <p className="text-sm text-gray-600 mt-2">
            {vehicle.city}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {vehicle.categoryTitle}/{vehicle.manufacturerTitle}
          </p>
        </div>

        <div className="border-t-2 border-gray-300 my-6"></div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">General Information</h2>
          <table className="w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Title</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.name ? '' : 'text-gray-500'}`}>
                  {vehicle.name ? vehicle.name : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Category</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.categoryTitle ? '' : 'text-gray-500'}`}>
                  {vehicle.categoryTitle ? vehicle.categoryTitle : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Manufacturer</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.manufacturerTitle ? '' : 'text-gray-500'}`}>
                  {vehicle.manufacturerTitle ? vehicle.manufacturerTitle : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Model</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.model ? '' : 'text-gray-500'}`}>
                  {vehicle.model ? vehicle.model : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Year</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.year ? '' : 'text-gray-500'}`}>
                  {vehicle.year ? vehicle.year : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Condition</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.condition ? '' : 'text-gray-500'}`}>
                  {vehicle.condition ? vehicle.condition : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Serial Number</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.serialNumber ? '' : 'text-gray-500'}`}>
                  {vehicle.serialNumber ? vehicle.serialNumber : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Horse Power</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.horsePower ? '' : 'text-gray-500'}`}>
                  {vehicle.horsePower ? vehicle.horsePower : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Horse Meter</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.horseMeter ? '' : 'text-gray-500'}`}>
                  {vehicle.horseMeter ? vehicle.horseMeter : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium">Stock Number</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.stockNumber ? '' : 'text-gray-500'}`}>
                  {vehicle.stockNumber ? vehicle.stockNumber : 'Not Provided'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300 bg-gray-100 font-medium align-top">Description</td>
                <td className={`px-4 py-2 border border-gray-300 ${vehicle.description ? '' : 'text-gray-500'}`}>
                  {vehicle.description ? vehicle.description : 'Not Provided'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;