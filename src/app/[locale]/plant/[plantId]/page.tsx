import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { getPlantById } from '@/db/actions/plant';
import { getTranslations } from 'next-intl/server';
import PageWrapper from '@/components/PageWrapper';
import EditPlantForm from '@/app/[locale]/plant/[plantId]/EditPlantForm';

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
