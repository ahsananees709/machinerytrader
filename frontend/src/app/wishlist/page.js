'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [pagination, setPagination] = useState({ totalPages: 1, viewingRange: '' });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = page * itemsPerPage;
    const totalPages = Math.ceil(favorites.length / itemsPerPage);

    setPagination({
      totalPages,
      viewingRange: `Showing ${startIdx + 1}-${Math.min(endIdx, favorites.length)} of ${favorites.length} vehicles`,
    });
  }, [favorites, page]);

  const handleHeartClick = (vehicle) => {
    const updatedFavorites = favorites.filter((item) => item.id !== vehicle.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl py-10 mx-auto lg:px-10 px-5">
        <h1 className="text-3xl font-bold text-center mb-8">My Favorite Vehicles</h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">You have no favorite vehicles yet.</p>
        ) : (
          <>
            <p className="text-gray-500 mt-5 mb-2 text-right">{pagination.viewingRange}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {favorites
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`bg-white border-2 shadow-md px-2 pb-4 pt-2 rounded-lg overflow-hidden flex flex-col ${
                      favorites.some((fav) => fav.id === vehicle.id) ? 'border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1 min-w-0 max-w-2/3">
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
                            favorites.some((fav) => fav.id === vehicle.id)
                              ? 'text-red-600'
                              : 'text-gray-500'
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
                      {vehicle.images.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img}
                            alt={`${vehicle.name} - ${index + 1}`}
                            className="h-48 w-full object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="mt-4 text-left">
                      {vehicle.price ? (
                        <span className="text-lg font-semibold">
                          Price: ${vehicle.price.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold">Contact us for pricing</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center space-x-4 mt-2">
                      <button className="flex-1 bg-secondary px-4 py-2 border-2 border-secondary rounded-xl mt-2 hover:bg-dark text-white tracking-wide">
                        Buy
                      </button>
                      <button className="flex-1 bg-primary px-4 py-2 border-2 border-primary rounded-xl mt-2 hover:bg-dark text-white tracking-wide">
                        More Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 px-5">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`mr-2 px-4 py-2 rounded-l-md ${
                  page > 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ◀
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-4 py-2 ${
                    p === page ? 'bg-primary text-white font-bold' : 'bg-white text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination.totalPages}
                className={`ml-2 px-4 py-2 rounded-r-md ${
                  page < pagination.totalPages
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
