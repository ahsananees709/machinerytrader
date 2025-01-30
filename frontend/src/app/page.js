// 'use client';

// import { useFilter } from './utils/FilterProvider';
// import { useRouter } from 'next/navigation';
// import { useState, useRef, useEffect } from 'react';
// import { Spinner } from './ui/spinner';

// export default function Home() {
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
//     setPage,
//     categoryLoading
//   } = useFilter();

//   const router = useRouter();

//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategory(categoryId);
//     setSelectedManufacturers([]);
//   };

//   const handleManufacturerChange = (manufacturerId) => {
//     setSelectedManufacturers((prev) =>
//       prev.includes(manufacturerId)
//         ? prev.filter((id) => id !== manufacturerId)
//         : [...prev, manufacturerId]
//     );
//   };

//   const handleSearch = () => {
//     setPage(1);
//     const queryParams = new URLSearchParams();

//     if (selectedCategory) {
//       queryParams.append('categoryId', selectedCategory);
//     }

//     selectedManufacturers.forEach((manufacturerId) => {
//       queryParams.append('manufacturerId', manufacturerId);
//     });

//     if (keywords.trim()) {
//       queryParams.append('keywords', keywords.trim());
//     }

//     router.push(`/vehicles?${queryParams.toString()}`);
//   };

//   useEffect(() => {
//     function handleOutsideClick(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setManufacturerDropdownOpen(false);
//       }
//     }
//     setSelectedCategory(''),
//     setSelectedManufacturers([]),
//     setKeywords(''),

//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   return (
//     <div
//       className="h-screen"
//       style={{
//         backgroundImage: "url('/home-background.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="flex flex-col justify-between h-screen">
//         {/* Add header and footer wrappers here if needed */}
//         {/* Content wrapper */}
//         <div className="flex-grow flex items-center justify-center">
//           <div className="max-w-screen-lg w-full py-5 px-5 lg:px-10 bg-white bg-opacity-90 rounded-[26px] shadow-lg">
//             {/* Categories Grid */}
//             <h2 className='text-xl font-bold mb-2 text-center'>New & Used Construction Equipment For Sale</h2>
//             <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 mt-5">
//               {categories
//                 .filter((category) => category.image)
//                 .map((item) => (
//                   <div
//                     key={item?.id}
//                     className=" p-1 max-w-[132px] transition-transform duration-300 hover:scale-105"
//                   >
                    
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-50 h-50 object-contain rounded-md cursor-pointer"
//                       onClick={() => {
//                         setSelectedCategory(item?.id);
//                         setSelectedManufacturers([]);
//                         router.push(`vehicles/?categoryId=${item.id}`)
//                       }}
//                     />
//                     <h4 className="text-black text-[14px] leading-[18px] text-center cursor-pointer"
//                     onClick={() => {
//                       setSelectedCategory(item?.id);
//                       setSelectedManufacturers([]);
//                       router.push(`vehicles/?categoryId=${item.id}`)
//                     }}>
//                       {item?.title || 'title'}
//                     </h4>
//                   </div>
//                 ))}
//               {categories.length === 0 && (
//   <Spinner height={8} width={8}/>
//   )}
//             </div>
//             <div className="mt-6 flex-col justify-center items-center gap-4 px-5">
//               <select
//                 className="p-3 border rounded-md text-sm"
//                 value={selectedCategory || ''}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.title}
//                   </option>
//                 ))}
//               </select>

//               {/* Manufacturers Dropdown */}
//               <div className="relative bg-white">
//                 <button
//                   type="button"
//                   onClick={() => setManufacturerDropdownOpen(!isManufacturerDropdownOpen)}
//                   className="p-3 border rounded-md text-sm w-72 relative"
//                 >
//                   Select Manufacturers
//                   <span
//                     className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
//                       isManufacturerDropdownOpen ? 'rotate-180' : ''
//                     }`}
//                   >
//                     &#9660;
//                   </span>
//                 </button>
//                 {isManufacturerDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="absolute z-10 p-2 bg-white border rounded-md w-72 mt-2 max-h-60 overflow-y-auto"
//                   >
//                     {manufacturers.map((manufacturer) => (
//                       <div key={manufacturer.id} className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           id={`manufacturer-${manufacturer.id}`}
//                           value={manufacturer.id}
//                           checked={selectedManufacturers.includes(manufacturer.id)}
//                           onChange={() => handleManufacturerChange(manufacturer.id)}
//                           className="p-2"
//                         />
//                         <label
//                           htmlFor={`manufacturer-${manufacturer.id}`}
//                           className="text-sm"
//                         >
//                           {manufacturer.title}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 placeholder="Keywords"
//                 className="p-3 border rounded-md flex-1 text-sm"
//                 value={keywords}
//                 onChange={(e) => setKeywords(e.target.value)}
//               />

//               <button
//                 onClick={handleSearch}
//                 className="p-3 w-32 bg-secondary hover:bg-red-700 text-white rounded-md text-sm"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useFilter } from './utils/FilterProvider';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Spinner } from './ui/spinner';

export default function Home() {
  const [isManufacturerDropdownOpen, setManufacturerDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const {
    categories,
    manufacturers,
    selectedCategory,
    setSelectedCategory,
    selectedManufacturers,
    setSelectedManufacturers,
    keywords,
    setKeywords,
    setPage,
    categoryLoading
  } = useFilter();

  const router = useRouter();

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedManufacturers([]);
  };

  const handleManufacturerChange = (manufacturerId) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturerId)
        ? prev.filter((id) => id !== manufacturerId)
        : [...prev, manufacturerId]
    );
  };

  const handleSearch = () => {
    setPage(1);
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

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setManufacturerDropdownOpen(false);
      }
    }
    setSelectedCategory(''),
    setSelectedManufacturers([]),
      setKeywords(''),
      setPage(1)
      localStorage.setItem('page', 1);

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
    className="h-[200vh] sm:h-[200vh] md:h-[150vh] lg:h-[120vh] flex items-center justify-center"

      style={{
        backgroundImage: "url('/home-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        {/* Content wrapper */}
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-screen-lg w-full py-5 px-5 lg:px-10 bg-white bg-opacity-90 rounded-[26px] shadow-lg">
            {/* Categories Grid */}
            <h2 className='text-xl font-bold mb-2 text-center'>New & Used Construction Equipment For Sale</h2>
            <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 mt-5">
              {
                categories
                .filter((category) => category.image)
                .map((item) => (
                  <div
                    key={item?.id}
                    className="p-1 max-w-[132px] transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-50 h-50 object-contain rounded-md cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(item?.id);
                        setSelectedManufacturers([]);
                        router.push(`vehicles/?categoryId=${item.id}`)
                      }}
                    />
                    <h4 className="text-black text-[14px] leading-[18px] text-center cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(item?.id);
                      setSelectedManufacturers([]);
                      router.push(`vehicles/?categoryId=${item.id}`)
                    }}>
                      {item?.title || 'title'}
                    </h4>
                  </div>
                ))}
              {categories.length === 0 && (
                <Spinner height={8} width={8}/>
              )}
            </div>

            {/* Filters and Search */}
            <div className="mt-6 flex flex-col lg:flex-row justify-center items-center gap-4 px-5">
              <div className="relative inline-block w-full">
  <select
    className="appearance-none w-full p-3 rounded-md text-center text-sm"
    value={selectedCategory || ''}
    onChange={handleCategoryChange}
  >
    <option value="">All Categories</option>
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.title}
      </option>
    ))}
  </select>
  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none cursor-pointer">
    &#9660;
  </span>
</div>

              {/* Manufacturers Dropdown */}
              <div className="relative bg-white">
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={() => setManufacturerDropdownOpen(!isManufacturerDropdownOpen)}
                  className="p-3 border rounded-md text-sm w-72 relative"
                >
                  Select Manufacturers
                  <span
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isManufacturerDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    &#9660;
                  </span>
                </button>
                {isManufacturerDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 p-2 bg-white border rounded-md w-72 mt-2 max-h-60 overflow-y-auto"
                  >
                    {manufacturers.map((manufacturer) => (
                      <div key={manufacturer.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`manufacturer-${manufacturer.id}`}
                          value={manufacturer.id}
                          checked={selectedManufacturers.includes(manufacturer.id)}
                          onChange={() => handleManufacturerChange(manufacturer.id)}
                          className="p-2"
                        />
                        <label
                          htmlFor={`manufacturer-${manufacturer.id}`}
                          className="text-sm"
                        >
                          {manufacturer.title}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Keywords"
                className="p-3 border rounded-md flex-1 text-sm"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />

              <button
                onClick={handleSearch}
                className="p-3 w-32 bg-secondary hover:bg-red-700 text-white rounded-md text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
