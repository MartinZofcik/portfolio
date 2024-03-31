'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import tree from '../../../../public/tree.jpg';
import { Plant } from '@/db/schema';
import Link from 'next/link';

interface PlantProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantProps> = ({ plant }) => {
  return (
    <Link href={`plant/${plant.id}`}>
      <Card key={plant?.id}>
        <CardHeader>
          <CardTitle>{plant?.slovak_name}</CardTitle>
          <CardDescription>{plant?.latin_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={tree} alt="Picture of the plant" />
        </CardContent>
        <CardFooter>
          <p className="text-xs">{plant?.description}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlantCard;
