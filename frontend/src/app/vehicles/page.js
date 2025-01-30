// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { useFilter } from '../utils/FilterProvider';
// import { useRouter } from 'next/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const VehiclesPage = () => {
//   const [isManufacturerDropdownOpen, setManufacturerDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const {
//     categories,
//     manufacturers,
//     selectedCategory,
//     setSelectedCategory,
//     selectedManufacturers,
//     setSelectedManufacturers,
//     keywords,
//     setKeywords,
//     page,
//     setPage,
//   } = useFilter();

//   const [vehicles, setVehicles] = useState([]);
//   const [pagination, setPagination] = useState({ totalPages: 1, totalVehicles: 0, viewingRange: '' });
//   const [loading, setLoading] = useState(true);
  
//   const router = useRouter();

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);

//       const query = new URLSearchParams({
//         page,
//         limit: 10,
//         categoryId: selectedCategory,
//         manufacturerId: selectedManufacturers.join(','),
//         keywords,
//       });

//       const response = await fetch(`http://localhost:4000/api/vehicle?${query}`);
//       const data = await response.json();

//       if (response.ok) {
//         setVehicles(data.data.vehicles);
//         setPagination({
//           totalPages: data.data.pagination.totalPages,
//           totalVehicles: data.data.pagination.totalVehicles,
//           viewingRange: data.data.pagination.viewingRange,
//         });
//       } else {
//         console.log('Error fetching vehicles:', data.message);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.log('Error fetching vehicles:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, [page, selectedCategory, selectedManufacturers, keywords]);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setSelectedManufacturers([]);  // Reset manufacturers when category changes
//   };

//   const handleManufacturerChange = (manufacturerId) => {
//     setSelectedManufacturers((prev) =>
//       prev.includes(manufacturerId)
//         ? prev.filter((id) => id !== manufacturerId)
//         : [...prev, manufacturerId]
//     );
//   };

// const handleSearch = () => {
//   setPage(1); // Reset to page 1 on filter change
//   const queryParams = new URLSearchParams();

//   if (selectedCategory) {
//     queryParams.append('categoryId', selectedCategory);
//   }

//   selectedManufacturers.forEach((manufacturerId) => {
//     queryParams.append('manufacturerId', manufacturerId);
//   });

//   if (keywords.trim()) {
//     queryParams.append('keywords', keywords.trim());
//   }

//   // Update the URL to reflect the selected filters
//   router.push(`/vehicles?${queryParams.toString()}`);
// };


//   const removeSelectedCategory = () => {
//     setSelectedCategory('');
//   };

//   const removeSelectedManufacturer = (manufacturerId) => {
//     setSelectedManufacturers((prev) =>
//       prev.filter((id) => id !== manufacturerId)
//     );
//   };

//   const removeKeyword = () => {
//     setKeywords('');
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-6">

//       <div className="flex flex-wrap gap-4 mb-6">
//         {selectedCategory && (
//           <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md">
//             <span>Category: {categories.find(cat => cat.id == selectedCategory)?.title}</span>
//             <button
//               onClick={removeSelectedCategory}
//               className="text-red-500 hover:text-red-700"
//             >
//               ✖
//             </button>
//           </div>
//         )}

//         {selectedManufacturers.length > 0 && selectedManufacturers.map((manufacturerId) => (
//           <div key={manufacturerId} className="flex items-center gap-2 bg-gray-200 p-2 rounded-md">
//             <span>{manufacturers.find(manufacturer => manufacturer.id === manufacturerId)?.title}</span>
//             <button
//               onClick={() => removeSelectedManufacturer(manufacturerId)}
//               className="text-red-500 hover:text-red-700"
//             >
//               ✖
//             </button>
//           </div>
//         ))}

//         {keywords && (
//           <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md">
//             <span>Keywords: {keywords}</span>
//             <button
//               onClick={removeKeyword}
//               className="text-red-500 hover:text-red-700"
//             >
//               ✖
//             </button>
//           </div>
//         )}
//       </div>

//       {/* <div className="mt-6 flex px-10 items-center gap-4">
//         <select
//           className="p-3 border rounded-md text-sm"
//           value={selectedCategory || ''}
//           onChange={handleCategoryChange}
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.title}
//             </option>
//           ))}
//         </select>

//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setManufacturerDropdownOpen(!isManufacturerDropdownOpen)}
//             className="p-3 border rounded-md text-sm w-72 relative"
//           >
//             Select Manufacturers
//             <span
//               className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isManufacturerDropdownOpen ? 'rotate-180' : ''}`}
//             >
//               &#9660;
//             </span>
//           </button>
//           {isManufacturerDropdownOpen && (
//             <div
//               ref={dropdownRef}
//               className="absolute z-10 p-2 bg-white border rounded-md w-72 mt-2 max-h-60 overflow-y-auto"
//             >
//               {manufacturers.map((manufacturer) => (
//                 <div key={manufacturer.id} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     id={`manufacturer-${manufacturer.id}`}
//                     value={manufacturer.id}
//                     checked={selectedManufacturers.includes(manufacturer.id)}
//                     onChange={() => handleManufacturerChange(manufacturer.id)}
//                     className="p-2"
//                   />
//                   <label htmlFor={`manufacturer-${manufacturer.id}`} className="text-sm">
//                     {manufacturer.title}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <input
//           type="text"
//           placeholder="Keywords"
//           className="p-3 border rounded-md flex-1 text-sm"
//           value={keywords}
//           onChange={(e) => setKeywords(e.target.value)}
//         />

//         <button onClick={handleSearch} className="p-3 w-32 bg-blue-500 text-white rounded-md text-sm">
//           Search
//         </button>
//       </div> */}

//       {loading ? (
//         <p>Loading vehicles...</p>
//       ) : (
//         <>
//           {vehicles.length <= 0 ? (
//             <div className="flex items-center justify-center">
//               <p className="text-2xl font-bold text-center">No Vehicles Found</p>
//             </div>
//           ) : (
//             <>
//                                   {/* Vehicle List */}
//                                   <p className="text-gray-500 mt-5">{pagination.viewingRange}</p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//                 {vehicles.map((vehicle) => (
//                   <div
//                     key={vehicle.id}
//                     className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
//                     >
//                         <div className="flex items-center justify-between w-full">
//   {/* Title Div */}
//   <div className="p-4 flex-1 min-w-0 max-w-2/3">
//     <h3 className="text-lg font-bold mt-2 sm:truncate sm:whitespace-nowrap break-words">
//       {vehicle.name}
//     </h3>
//     <p className="text-sm text-gray-600 mt-3">
//       {vehicle.categoryTitle}/{vehicle.manufacturerTitle}
//     </p>
//   </div>

//   {/* Heart Icon Div */}
//   <div className="flex-shrink-0">
//     <svg
//       className="w-8 h-8 text-gray-500 hover:text-red-500 transition-all duration-300"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//     </svg>
//   </div>
// </div>

                         
//                     <Swiper
//                       modules={[Navigation, Pagination]}
//                       spaceBetween={10}
//                       slidesPerView={1}
//                       navigation
//                       pagination={{ clickable: true }}
//                       className="h-48 w-full"
//                     >
//                       {vehicle.images.map((img, index) => (
//                         <SwiperSlide key={index}>
//                           <img
//                             src={img}
//                             alt={`${vehicle.name} - ${index + 1}`}
//                             className="h-48 w-full object-cover"
//                           />
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                     <div className="mt-4 text-left">
//                         {vehicle.price ? (
//                           <span className="text-lg font-semibold">
//                             Price: ${vehicle.price.toFixed(2)}
//                           </span>
//                         ) : (
//                           <span className="text-sm font-semibold">
//                             Contact us for pricing
//                           </span>
//                         )}
//                       </div>
//                     <div className="flex justify-between items-center space-x-4 mt-2">
//                         <button className="flex-1 bg-secondary px-4 py-2 border-2 border-secondary rounded-xl mt-2 hover:bg-dark text-white tracking-wide">
//                           Buy
//                         </button>
//                         <button className="flex-1 bg-primary px-4 py-2 border-2 border-primary rounded-xl mt-2 hover:bg-dark text-white tracking-wide">
//                           More Details
//                         </button>
//                       </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center mt-6 px-5">
//                 <button
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                   className={`mr-2 px-4 py-2 rounded-l-md ${
//                     page > 1
//                       ? "bg-primary text-white"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   ◀
//                 </button>

//                 {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
//                   (p) => (
//                     <button
//                       key={p}
//                       onClick={() => handlePageChange(p)}
//                       className={`px-4 py-2 ${
//                         p === page
//                           ? "bg-primary text-white font-bold"
//                           : "bg-white text-gray-600"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   )
//                 )}

//                 <button
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === pagination.totalPages}
//                   className={`ml-2 px-4 py-2 rounded-r-md ${
//                     page < pagination.totalPages
//                       ? "bg-primary text-white"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   ▶
//                 </button>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default VehiclesPage;

'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useFilter } from '../utils/FilterProvider';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Spinner } from '../ui/spinner';
import { BASE_URL } from '../utils/constant';

const VehiclesPage = () => {
  const [isManufacturerDropdownOpen, setManufacturerDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    categories,
    manufacturers,
    selectedCategory,
    setSelectedCategory,
    selectedManufacturers,
    setSelectedManufacturers,
    keywords,
    setKeywords,
    page,
    setPage,
  } = useFilter();

  const [vehicles, setVehicles] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, totalVehicles: 0, viewingRange: '' });
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicle2, setSelectedVehicle2] = useState(null);
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [isSubmittingModal, setIsSubmittingModal] = useState(false)
  const [isSubmittingModal2, setIsSubmittingModal2] = useState(false)
  
  const router = useRouter();

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page,
        limit: 10,
        categoryId: selectedCategory,
        manufacturerId: selectedManufacturers.join(','),
        keywords,
      });

      const response = await fetch(`${BASE_URL}/vehicle?${query}`);
      const data = await response.json();
      if (response.ok) {
        setVehicles(data.data.vehicles);
        setPagination({
          totalPages: data.data.pagination.totalPages,
          totalVehicles: data.data.pagination.totalVehicles,
          viewingRange: data.data.pagination.viewingRange,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('Error fetching vehicles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    // fetchVehicles();
  }, []);

//   useEffect(() => {
//     fetchVehicles();
    //   }, [page, selectedCategory, selectedManufacturers, keywords]);
    useEffect(() => {
      const storedCategory = localStorage.getItem('selectedCategory') || selectedCategory;
      const storedManufacturers = (() => {
        const manufacturers = localStorage.getItem('selectedManufacturers');
        if (manufacturers) {
          try {
            return JSON.parse(manufacturers);
          } catch (error) {
            console.error('Error parsing selectedManufacturers:', error);
            return setSelectedManufacturers; 
          }
        }
        return setSelectedManufacturers;
      })();
        const storedKeywords = localStorage.getItem('keywords') || '';
        const storedPage = Number(localStorage.getItem('page')) || 1;
      
        setSelectedCategory(storedCategory);
        setSelectedManufacturers(storedManufacturers);
        setKeywords(storedKeywords);
        setPage(storedPage);
      
        fetchVehicles(); // Fetch vehicles after setting filters
      }, []);
  
      useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
        localStorage.setItem('selectedManufacturers', JSON.stringify(selectedManufacturers));
        localStorage.setItem('keywords', keywords);
        localStorage.setItem('page', page);
      
        fetchVehicles().finally(() => setLoading(false));; // Fetch updated vehicles list whenever filters change
      }, [selectedCategory, selectedManufacturers, keywords, page]);
      

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedManufacturers([]);  // Reset manufacturers when category changes
  };

  const handleManufacturerChange = (manufacturerId) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturerId)
        ? prev.filter((id) => id !== manufacturerId)
        : [...prev, manufacturerId]
    );
  };

  const handleSearch = () => {
    setPage(1); // Reset to page 1 on filter change
    const queryParams = new URLSearchParams();

    if (selectedCategory) {
      queryParams.append('categoryId', selectedCategory);
    }

    selectedManufacturers.forEach((manufacturerId) => {
      queryParams.append('manufacturerId', manufacturerId);
    });

    if (keywords.trim()) {
      queryParams.append('keywords', keywords.trim());
    }
    router.push(`/vehicles?${queryParams.toString()}`);
  };

  const handleHeartClick = (vehicle) => {
    const favoriteIds = favorites.map((item) => item.id)
    if (favoriteIds.includes(vehicle.id)) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== vehicle.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      setSelectedVehicle(vehicle);
      setModalOpen(true);
    }
  };

const handleModalSubmit = async () => {
  if (email.trim()) {
    setIsSubmittingModal(true)
      try {
        const response = await fetch(`${BASE_URL}/email/favourite`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vehicleId: selectedVehicle.id, userEmail: email }),
        });
  
        if (response.ok) {
          // Add the vehicle to favorites
        setIsSubmittingModal(false)
      const updatedFavorites = [...favorites, selectedVehicle];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
          alert('Favorite saved successfully!');
        } else {
          setIsSubmittingModal(false)
          alert('Error saving favorite.');
        }
      } catch (error) {
        setIsSubmittingModal(false)
        console.error('Error submitting favorite:', error);
      }
    }
  
    // Close the modal and reset email state
    setModalOpen(false);
    setEmail('');
  };

  const handleModal2Submit = async () => {
    if (email2.trim()) {
      try {
        setIsSubmittingModal2(true)
          const response = await fetch(`${BASE_URL}/email/buy-now`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vehicleId: selectedVehicle2.id, userEmail: email2 }),
          });
    
          if (response.ok) {
            alert(response.data.message);
            setIsSubmittingModal2(false)
          } else {
            setIsSubmittingModal2(false)
            alert('Error submitting form, try again later.');
            
          }
      } catch (error) {
        setIsSubmittingModal2(false)
          console.error('Error submitting favorite:', error);
        }
      }
    
      // Close the modal and reset email state
      setModal2Open(false);
      setEmail2('');
    };
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-6">
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Enter your email to save to favorites</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full p-3 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                  {isSubmittingModal ? (
            <div className="flex items-center">
              Submitting...
                    <Spinner width={6} height={6}/>  
            </div>
          ) : (
            'Submit'
          )}
              </button>
            </div>
          </div>
        </div>
      )}

{modal2Open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-bold text-center">Buy Equipment</h2>
            <h2 className="text-lg font-semibold text-gray-500 text-center text-center">{selectedVehicle2.name}</h2>
            <h2 className="text-sm text-gray-500 text-center font-bold mb-4">Provide us your email, we will contact you soon.</h2>
            <input
              type="email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              placeholder="Your email"
              className="w-full p-3 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setModal2Open(false)
                  setSelectedVehicle2('')
                  setEmail2('')

                }}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleModal2Submit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {isSubmittingModal2 ? (
            <div className="flex items-center">
              Submitting...
                    <Spinner width={6} height={6}/>  
            </div>
          ) : (
            'Submit'
          )}
              </button>
            </div>
          </div>
        </div>
      )}

{loading ? (
  <Spinner width={8} height={8}/> 
      ) : (
      <>
       { vehicles.length  <=0 && (
          <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-center">No Vehicles Found</p>
        </div>
            )}
            {vehicles.length > 0 && (
               <>
               <p className="text-gray-500 mt-5 mb-2 text-right">{pagination.viewingRange}</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {vehicles.map((vehicle) => (
                   <div
                     key={vehicle.id}
                     className={`bg-white border-2 shadow-md px-2 pb-4 pt-2 rounded-lg overflow-hidden flex flex-col ${
                       favorites.includes(vehicle.id) ? "border-red-500" : ""
                     }`}
                   >
                     <div className="flex items-start justify-between w-full">
                       <div className=" flex-1 min-w-0 max-w-2/3">
                         <h3 className="text-lg font-bold sm:truncate sm:whitespace-nowrap break-words">
                           {vehicle.name}
                         </h3>
                         <p className="text-sm text-gray-500 mt-1 mb-2">
                           {vehicle.categoryTitle}/{vehicle.manufacturerTitle}
                         </p>
                       </div>
           
                       <div className="flex-shrink-0">
                         <svg
                           onClick={() => handleHeartClick(vehicle)}
                           className={`w-8 h-8 ${
                             favorites.some((favorite) => favorite.id === vehicle.id) 
                               ? "text-red-600" 
                               : "text-gray-500"
                           } hover:text-red-600 transition-all duration-300 cursor-pointer`}
                           xmlns="http://www.w3.org/2000/svg"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                         </svg>
                       </div>
                     </div>
           
                     <Swiper
                       modules={[Navigation, Pagination]}
                       spaceBetween={10}
                       slidesPerView={1}
                       navigation
                       pagination={{ clickable: true }}
                       className="h-48 w-full"
                     >
                       {vehicle.images?.map((img, index) => {
                 const modifiedImg = img.replace(/350|220/g, '');
           
                 return (
                   <SwiperSlide key={index}>
                     <img
                       src={modifiedImg}
                       alt={`${vehicle.title} - ${index + 1}`}
                       className="w-full object-fit h-96 rounded-lg"
                     />
                   </SwiperSlide>
                 );
               })}  
                     </Swiper>
           
                     <div className="mt-4 text-left">
                       {vehicle.price ? (
                         <span className="text-lg font-semibold">
                           Price: ${vehicle.price.toFixed(2)}
                         </span>
                       ) : (
                         <span className="text-sm font-semibold">
                           Contact us for pricing
                         </span>
                       )}
                     </div>
           
                     <div className="flex justify-between items-center space-x-4 mt-2">
                       <button className="flex-1 bg-secondary px-4 py-2 border-2 border-secondary rounded-xl mt-2 text-white tracking-wide transform hover:scale-105 hover:shadow-lg transition-transform duration-200"
                         onClick={() => {
                           setModal2Open(true)
                           setSelectedVehicle2(vehicle)
                         }}>
                         Buy
                       </button>
                       <button
                         className="flex-1 bg-primary px-4 py-2 border-2 border-primary rounded-xl mt-2 text-white tracking-wide transform hover:scale-105 hover:shadow-lg transition-transform duration-200"
                         onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                       >
                         More Details
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
           
               <div className="flex justify-center mt-6 px-5">
             {/* First Page */}
             <button
               onClick={() => handlePageChange(1)}
               disabled={page === 1}
               className={`mr-2 px-4 py-2 rounded-l-md ${
                 page > 1
                   ? "bg-primary text-white"
                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
             >
               First
             </button>
           
             {/* Previous Page */}
             <button
               onClick={() => handlePageChange(page - 1)}
               disabled={page === 1}
               className={`mr-2 px-4 py-2 ${
                 page > 1
                   ? "bg-primary text-white"
                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
             >
               ◀
             </button>
           
             {/* Current Page */}
             <span className="px-4 py-2 bg-primary text-white font-bold">
               {page}
             </span>
           
             {/* Next Page */}
             <button
               onClick={() => handlePageChange(page + 1)}
               disabled={page === pagination.totalPages}
               className={`ml-2 px-4 py-2 ${
                 page < pagination.totalPages
                   ? "bg-primary text-white"
                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
             >
               ▶
             </button>
           
             {/* Last Page */}
             <button
               onClick={() => handlePageChange(pagination.totalPages)}
               disabled={page === pagination.totalPages}
               className={`ml-2 px-4 py-2 rounded-r-md ${
                 page < pagination.totalPages
                   ? "bg-primary text-white"
                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
               }`}
             >
               Last
             </button>
           </div>
           
                       </>
            )}
            </>
      )
   }

    </div>
  );
};

export default VehiclesPage;
