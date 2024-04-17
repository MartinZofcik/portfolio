import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Link href="/list">
        <Button>List</Button>
      </Link>
    </PageWrapper>
  );
}
