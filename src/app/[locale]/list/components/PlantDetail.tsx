import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Plant } from '@prisma/client';
import axios from 'axios';

interface PlantDetailProps {
  plant: Plant;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant }) => {
  const t = useTranslations('Index');
  const [treflePlantDetails, setTreflePlantDetails] = React.useState<any>(null);

  useEffect(() => {
    axios
      .get(`/api/trefle?plant_name=${plant.latin_name.split(' ')[0]}`)
      .then((res) => setTreflePlantDetails(res.data.data.data));
  }, [plant]);

  console.log(treflePlantDetails);

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          {treflePlantDetails?.[0]?.family}
        </h1>
        <h2 className="text-xl italic text-gray-600">{plant.latin_name}</h2>
      </div>
      <div className="flex justify-center my-4">
        {/*<img src={plant.image_url} alt={plant.common_name} className="rounded-lg" />*/}
      </div>
      <div className="space-y-4">
        <p>
          <strong>Year:</strong> {plant.size}
        </p>
        <p>
          <strong>Bibliography:</strong> {plant.id}
        </p>
        <p>
          <strong>Author:</strong> {plant.ownerId}
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
