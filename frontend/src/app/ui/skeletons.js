import React from 'react'

// export function ProductSkeleton() {
//     return (
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
//         <div className="w-full h-48 bg-gray-300"></div> {/* Skeleton for Image */}
//         <div className="p-4">
//           <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Skeleton for Title */}
//         </div>
//       </div>
//     );
//   }

export function ProductSkeleton(){
return (
  <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
    {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6"> */}
      {/* Left Side: Properties */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-64 rounded-md mb-4"></div>
        ))}
      </div>

      {/* Right Side: Google Map */}
      {/* <div className="lg:col-span-2 relative hidden md:block">
        <div className="h-64 bg-gray-200 animate-pulse"></div>
      </div> */}
    {/* </div> */}
  </div>
);
}


 export const DetailPageLoader = () => (
  <div className="space-y-8 mt-5">
    {/* Title and Reference */}
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>

    {/* Image Slider */}
    <div className="animate-pulse mb-8">
      <div className="h-96 bg-gray-300 rounded-lg"></div>
    </div>

    {/* Divider */}
    <div className="border-t-2 border-gray-200 my-6"></div>

    {/* Features */}
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t-2 border-gray-200 my-6"></div>

    {/* Description */}
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/4 mb-4"></div>
    </div>

    {/* Divider */}
    <div className="border-t-2 border-gray-200 my-6"></div>

  </div>
);