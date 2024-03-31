import { getPlants } from '@/db/actions';
import PlantCard from '@/app/list/components/PlantCard';
import { Plant } from '@/db/schema';

export default async function PlantsListPage() {
  const plants = await getPlants();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*<ListTableToggle />*/}
      <div className="grid grid-cols-3 gap-8">
        {plants &&
          plants.map((plant: Plant) => (
            <PlantCard key={plant?.id} plant={plant} />
          ))}
      </div>
    </div>
  );
}
