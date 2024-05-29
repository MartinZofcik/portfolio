import React, { useEffect } from 'react';
import { Plant } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { Loader } from 'lucide-react';

interface PlantDetailProps {
  plant: Plant;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant }) => {
  const [treflePlantDetails, setTreflePlantDetails] = React.useState<any>(null);

  useEffect(() => {
    axios
      .get(`/api/trefle?plant_name=${plant.latin_name}`)
      .then((res) => setTreflePlantDetails(res.data.data.data));
  }, [plant]);

  console.log(treflePlantDetails);

  if (!treflePlantDetails) {
    return <Loader className="m-auto" />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          Family: {treflePlantDetails?.[0]?.family}
        </h1>
        <h2 className="text-xl italic text-gray-600">
          Genus: {treflePlantDetails?.[0]?.genus}
        </h2>
        <p className="text-xl italic text-gray-600">
          {treflePlantDetails?.[0]?.year}
        </p>
      </div>
      <div className="flex justify-center my-4">
        {treflePlantDetails?.[0]?.image_url && (
          <Image
            src={treflePlantDetails?.[0]?.image_url}
            alt="plant-image"
            className="rounded-lg"
            width={200}
            height={350}
          />
        )}
      </div>
      <div className="space-y-4">
        <p>
          <strong>Size:</strong> {plant.size}
        </p>
        {/*<p><strong>Status:</strong> {plant.status}</p>*/}
        {/*<p><strong>Rank:</strong> {plant.rank}</p>*/}
        {/*<p><strong>Family:</strong> {plant.family}</p>*/}
        {/*<p><strong>Genus:</strong> {plant.genus}</p>*/}
        {/*<p><strong>Synonyms:</strong> {plant.synonyms.join(', ')}</p>*/}
      </div>
    </div>
  );
};

export default PlantDetail;
