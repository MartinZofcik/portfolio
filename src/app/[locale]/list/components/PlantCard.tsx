'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plant } from '@prisma/client';
import { Leaf, Navigation, Pencil, Ruler, Sprout } from 'lucide-react';
import { ModalContext } from '@/app/context/modal-provider';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import { handleActionResponse } from '@/app/api/utils';
import { editIsFavorite } from '@/db/actions/plant/Update';
import PlantDetail from '@/app/[locale]/list/components/PlantDetail';
import EditPlantForm from '@/components/form/EditPlantForm';

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const t = useTranslations('Index');
  const { toggleModal } = React.useContext(ModalContext);
  const { toast } = useToast();

  const handleOpenDetail = () => {
    toggleModal({
      isOpen: true,
      title: (
        <div className="flex flex-row items-center">
          <Sprout color="#22ac20" className="mr-2" height={25} width={25} />
          {plant.latin_name}
        </div>
      ),
      content: <PlantDetail plant={plant} />,
    });
  };

  const handleOpenEdit = () => {
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

  async function handleIsFavorite(
    id: string,
    isCurrentlyFavorite: boolean | null,
  ) {
    if (typeof isCurrentlyFavorite === 'boolean') {
      const response = await editIsFavorite(id, isCurrentlyFavorite);
      handleActionResponse(response, t, toast, undefined);
    }
  }

  return (
    <Card key={plant?.id} className="h-full flex flex-col">
      <CardHeader className="h-28 pb-3">
        <div className="flex flex-row justify-between">
          <div
            className="w-4/6 hover:cursor-pointer"
            onClick={handleOpenDetail}
          >
            <CardTitle className="mb-1">{plant?.latin_name}</CardTitle>
            <CardDescription>{plant?.slovak_name}</CardDescription>
          </div>
          <div className="w-1/6 p-0 flex flex-row justify-between">
            <Leaf
              color="#22ac20"
              fill={plant.is_favorite ? '#4ade80' : ''}
              height={20}
              width={20}
              className={
                plant.is_favorite
                  ? 'hover:cursor-pointer hover:fill-transparent'
                  : 'hover:cursor-pointer hover:fill-green-400'
              }
              onClick={() => handleIsFavorite(plant.id, plant?.is_favorite)}
            />
            <Pencil
              className="hover:cursor-pointer hover:fill-white"
              height={18}
              width={18}
              onClick={handleOpenEdit}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent onClick={handleOpenDetail} className="hover:cursor-pointer">
        {/*<Image src={tree} alt="Picture of the plant" />*/}
        <div className="flex flex-col pb-3 justify-start text-muted-foreground">
          <div className="flex items-center">
            <Ruler height={18} width={18} />
            <p className="text-xs ml-2 uppercase">
              {t(`plantForm.fields.size.${plant.size}`)}
            </p>
          </div>
          <div className="flex flex-row items-center mt-1">
            <div>
              <Navigation height={18} width={18} />
            </div>
            <p className="text-xs overflow-hidden ml-2">
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
