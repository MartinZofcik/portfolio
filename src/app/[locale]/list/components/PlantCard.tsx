'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import tree from '../../../../../public/tree.jpg';
import Link from 'next/link';
import { Plant } from '@prisma/client';
import { CalendarHeart, Leaf, Ruler } from 'lucide-react';

interface PlantProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantProps> = ({ plant }) => {
  return (
    <Card key={plant?.id} className="h-full flex flex-col">
      <Link href={`plant/${plant.id}`}>
        <CardHeader className="h-28">
          <CardTitle>
            <div>{plant?.latin_name}</div>
          </CardTitle>
          <CardDescription>{plant?.slovak_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={tree} alt="Picture of the plant" />
          <div className="flex flex-col pb-3 px-2 justify-start text-muted-foreground">
            <div className="flex items-start">
              <Ruler height={16} width={16} />
              <p className="text-xs ml-1"> {plant.size ?? '-'}</p>
            </div>
            <div className="flex items-start mt-2">
              <p className="text-xs max-h-12 overflow-hidden">
                {plant?.recommended_place ?? '-'}
              </p>
            </div>
          </div>

          {plant?.description && (
            <p className="text-xs max-h-48 overflow-hidden">
              {plant?.description}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlantCard;
