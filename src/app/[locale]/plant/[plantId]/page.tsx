import PageWrapper from '@/components/PageWrapper';
import EditPlantForm from '@/app/[locale]/plant/[plantId]/EditPlantForm';
import { getPlantById } from '@/db/actions/plant/Read';

export default async function PlantDetail({
  params,
}: {
  params: { plantId: string };
}) {
  // const t = await getTranslations('Index');
  const plant = await getPlantById(params.plantId);

  if (!plant) {
    return null;
  }

  return (
    <PageWrapper>
      <EditPlantForm plant={plant} />
    </PageWrapper>
  );
}
