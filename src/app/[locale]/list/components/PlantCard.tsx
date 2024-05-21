'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import tree from '../../../../../public/tree.jpg';
import { Plant } from '@prisma/client';
import { Leaf, Pencil, Ruler } from 'lucide-react';
import { ModalContext } from '@/app/context/modal-provider';
import { useTranslations } from 'next-intl';
import EditPlantForm from '@/app/[locale]/plant/[plantId]/EditPlantForm';
import { useToast } from '@/components/ui/use-toast';
import { handleActionResponse } from '@/app/api/utils';
import { editIsFavorite } from '@/db/actions/plant/Update';

interface PlantProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantProps> = ({ plant }) => {
  const t = useTranslations('Index');
  const { toggleModal } = React.useContext(ModalContext);
  const { toast } = useToast();

  const handleEdit = () => {
    toggleModal({
      isOpen: true,
      title: (
        <div className="flex flex-row items-center">
          <Pencil color="#22ac20" className="mr-2" height={20} width={20} />
          {t('plantForm.edit')}
        </div>
      ),
      content: <EditPlantForm plant={plant} />,
    });
  };

  async function handleIsFavorite(id: string, isFavorite: boolean | null) {
    if (typeof isFavorite === 'boolean') {
      const response = await editIsFavorite(id, isFavorite);
      handleActionResponse(response, t, toast, undefined);
    }
  }

  return (
    <Card key={plant?.id} className="h-full flex flex-col">
      <CardHeader className="h-28">
        <div className="flex flex-row justify-between">
          <div className="w-5/6 hover:cursor-pointer" onClick={handleEdit}>
            <CardTitle className="mb-1">{plant?.latin_name}</CardTitle>
            <CardDescription>{plant?.slovak_name}</CardDescription>
          </div>
          <div>
            <Leaf
              color="#22ac20"
              fill={plant.is_favorite ? '#4ade80' : ''}
              // strokeWidth={0}
              height={20}
              width={20}
              className={
                plant.is_favorite
                  ? 'hover:cursor-pointer hover:fill-transparent'
                  : 'hover:cursor-pointer hover:fill-green-400'
              }
              onClick={() => handleIsFavorite(plant.id, plant?.is_favorite)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent onClick={handleEdit} className="hover:cursor-pointer">
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
    </Card>
  );
};

export default PlantCard;
