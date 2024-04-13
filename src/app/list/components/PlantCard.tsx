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
import tree from '../../../../public/tree.jpg';
import Link from 'next/link';
import { Plant } from '@prisma/client';
import { CalendarHeart, Leaf, Ruler } from 'lucide-react';

interface PlantProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantProps> = ({ plant }) => {
  return (
    <Link href={`plant/${plant.id}`}>
      <Card key={plant?.id} className="h-full flex flex-col">
        <CardHeader className="h-28">
          <CardTitle>{plant?.latin_name}</CardTitle>
          <CardDescription>{plant?.slovak_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={tree} alt="Picture of the plant" />
          <div className="flex py-3 px-4 justify-between text-muted-foreground">
            <div className="flex items-end">
              <CalendarHeart height={18} width={18} />
              <p className="text-xs ml-1"> {plant.age_months ?? '-'}m</p>
            </div>
            <div className="flex items-end">
              <Leaf height={18} width={18} />
              <p className="text-xs ml-1"> {plant.leave_number ?? '-'}</p>
            </div>
            <div className="flex items-end">
              <Ruler height={18} width={18} />
              <p className="text-xs ml-1"> {plant.size ?? '-'}</p>
            </div>
          </div>
          {plant?.description && (
            <p className="text-xs h-32 overflow-clip">{plant?.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlantCard;
