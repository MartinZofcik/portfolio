import PlantsView from '@/app/list/components/PlantsView';

export default async function PlantsListPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
      <PlantsView />
    </div>
  );
}
