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
import { Plant } from '@prisma/client';
import {
  Droplet,
  FlaskConical,
  Leaf,
  Navigation,
  Pencil,
  Ruler,
  Sprout,
} from 'lucide-react';
import { ModalContext } from '@/app/context/modal-provider';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import { handleActionResponse } from '@/app/api/utils';
import {
  editIsFavorite,
  editLastFertilized,
  editLastWatered,
} from '@/db/actions/plant/Update';
import PlantDetail from '@/app/[locale]/list/components/PlantDetail';
import EditPlantForm from '@/components/form/EditPlantForm';
import {
  setFertilizeIconColor,
  setWaterIconColor,
} from '@/app/[locale]/list/components/utils';

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

  async function handleWatered(id: string) {
    const response = await editLastWatered(id);
    handleActionResponse(response, t, toast, undefined);
  }

  async function handleFertilized(id: string) {
    const response = await editLastFertilized(id);
    handleActionResponse(response, t, toast, undefined);
  }

  return (
    <Card key={plant?.id} className="h-full flex flex-col">
      <CardHeader className="h-28 pb-3">
        <div className="flex flex-row justify-between">
          <div
            className="w-5/6 hover:cursor-pointer"
            onClick={handleOpenDetail}
          >
            <CardTitle className="mb-1">{plant?.latin_name}</CardTitle>
            <CardDescription>{plant?.slovak_name}</CardDescription>
          </div>
          <div className="w-1/6 p-0 flex flex-row justify-end">
            <Pencil
              className="hover:cursor-pointer hover:fill-white"
              height={18}
              width={18}
              onClick={handleOpenEdit}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent
        onClick={handleOpenDetail}
        className="hover:cursor-pointer h-64"
      >
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
      <CardFooter>
        <div className="w-3/6 m-auto flex flex-row justify-between items-center">
          <Leaf
            color="#22ac20"
            fill={plant.is_favorite ? '#4ade80' : ''}
            height={22}
            width={22}
            className={
              plant.is_favorite
                ? 'hover:cursor-pointer hover:fill-transparent'
                : 'hover:cursor-pointer hover:fill-green-400'
            }
            onClick={() => handleIsFavorite(plant.id, plant?.is_favorite)}
          />
          <Droplet
            color="#3560af"
            height={24}
            width={24}
            fill={setWaterIconColor(plant?.last_watered)}
            className="hover:cursor-pointer hover:fill-blue-800"
            onClick={() => handleWatered(plant.id)}
          />
          <FlaskConical
            color="#2ad5b3"
            height={22}
            width={22}
            fill={setFertilizeIconColor(plant?.last_fertilized)}
            className="hover:cursor-pointer hover:fill-cyan-500"
            onClick={() => handleFertilized(plant.id)}
            // onMouseOver={show lastFertilized Date tooltip}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
