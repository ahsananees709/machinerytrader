import React, {Suspense} from 'react';
import { BASE_URL } from "@/app/utils/constant"
import { DetailPageLoader } from "@/app/ui/skeletons";
import VehicleDetails from './VehicleDetails';

export async function generateMetadata({ params }) {
    const id = (await params).id

  try {
    const res = await fetch(`${BASE_URL}/vehicle/?vehicleId=${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch vehicle data");
    }

    const vehicle = await res.json();
      const vehicleData = vehicle.data.vehicles[0];
      
      if (!vehicle?.data?.vehicles?.[0]) {
        console.warn("Vehicle data is empty");
        return {
          title: "Vehicle Not Found",
          description: "The vehicle you are looking for does not exist or has been removed.",
        };
      }

    return {
      title: vehicleData.name,
      description: vehicleData.description,
      keywords: `${vehicleData.year}, ${vehicleData.model}, buy ${vehicleData.name}`,
      openGraph: {
        title: vehicleData.name,
        description: `Explore the ${vehicleData.name}. Perfect for all your needs!`,
        url: `${BASE_URL}/vehicle/${id}`,
        type: "website",
        images: [
          {
            url: vehicleData.images[0],
            alt: vehicleData.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error.message);
  }
}

const DetailPage = async ({ params }) => {
    const id = (await params).id

    const res = await fetch(`${BASE_URL}/vehicle/?vehicleId=${id}`, { cache: "no-store" });
    const data = await res.json();
    const vehicle = data.data.vehicles[0];

    if (!vehicle) {
        return <p className="text-center mt-10">No property data available.</p>;
    }

    return (
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<DetailPageLoader />}>
                <VehicleDetails vehicle={vehicle} />
            </Suspense>
        </div>

    );
};

export default DetailPage;
