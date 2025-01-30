// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const FilterContext = createContext();

// export function FilterProvider({ children }) {
//   const [categories, setCategories] = useState([]);
//   const [manufacturers, setManufacturers] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedManufacturers, setSelectedManufacturers] = useState([]);
//   const [keywords, setKeywords] = useState('');

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch('http://localhost:4000/api/category');
//         const data = await response.json();
//         setCategories(data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     async function fetchManufacturers() {
//       try {
//         const response = await fetch(
//           selectedCategory
//             ? `http://localhost:4000/api/manufacturer?categoryId=${selectedCategory}`
//             : `http://localhost:4000/api/manufacturer`
//         );
//         const data = await response.json();
//         setManufacturers(data.data);
//       } catch (error) {
//         console.error('Error fetching manufacturers:', error);
//       }
//     }

//     if (selectedCategory !== null) {
//       fetchManufacturers();
//     }
//   }, [selectedCategory]);

//   return (
//     <FilterContext.Provider
//       value={{
//         categories,
//         manufacturers,
//         selectedCategory,
//         setSelectedCategory,
//         selectedManufacturers,
//         setSelectedManufacturers,
//         keywords,
//         setKeywords,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// }

// export function useFilter() {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error('useFilter must be used within a FilterProvider');
//   }
//   return context;
// }


'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from './constant';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1); // Track current page
  const [limit, setLimit] = useState(20); // Items per page
  const [categoryLoading, setCategoryLoading] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoryLoading(true)
        const response = await fetch(`${BASE_URL}/category`);
        const data = await response.json();
        setCategories(data.data);
        setCategoryLoading(false)
      } catch (error) {
        setCategoryLoading(false)
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchManufacturers() {
      try {
        const response = await fetch(
          selectedCategory
            ? `${BASE_URL}/manufacturer?categoryId=${selectedCategory}`
            : `${BASE_URL}/manufacturer`
        );
        const data = await response.json();
        setManufacturers(data.data);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    }

    if (selectedCategory !== null) {
      fetchManufacturers();
    }
  }, [selectedCategory]);

  return (
    <FilterContext.Provider
      value={{
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
        limit,
        setLimit,
        categoryLoading
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
