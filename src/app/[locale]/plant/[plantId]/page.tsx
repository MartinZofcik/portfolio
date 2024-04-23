import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { getPlantById } from '@/db/actions/plant';
import { getTranslations } from 'next-intl/server';
import PageWrapper from '@/components/PageWrapper';

export default async function PlantDetail({
  params,
}: {
  params: { plantId: string };
}) {
  // const t = await getTranslations('Index');
  const plant = await getPlantById(params.plantId);

  console.log(plant);
  return (
    <PageWrapper>
      <Link href="/list">
        <Button>Listaa</Button>
      </Link>
    </PageWrapper>
  );
}
