'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Plant, Size } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';

type TPlantFormProps = {
  onSubmit: (data: z.infer<typeof createPlantSchema>) => void;
  plant?: Plant;
};

const initialForm = {
  latin_name: '',
  slovak_name: '',
  size: Size.MEDIUM,
  description: '',
  recommended_place: '',
};

const PlantForm: React.FC<TPlantFormProps> = ({ onSubmit, plant = null }) => {
  const t = useTranslations('Index');

  const initialPlant = plant
    ? {
        latin_name: plant.latin_name,
        slovak_name: plant.slovak_name ?? '',
        size: plant.size ?? Size.MEDIUM,
        description: plant.description ?? '',
        recommended_place: plant.recommended_place ?? '',
      }
    : undefined;

  const form = useForm<z.infer<typeof createPlantSchema>>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: !!plant ? initialPlant : initialForm,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="latin_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.latin_name')}</FormLabel>
              <FormControl>
                <Input placeholder="Phoenix Canariensis" {...field} />
              </FormControl>
              {/*<FormDescription>Latin Name</FormDescription>*/}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slovak_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.slovak_name')}</FormLabel>
              <FormControl>
                <Input placeholder="Ďatlovník kanársky" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.size.title')} </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('plantForm.size.selectSize')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(Object.keys(Size) as Array<keyof typeof Size>).map(
                    (size) => (
                      <SelectItem key={size} value={size}>
                        {t(`plantForm.size.${size}`)}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.description.title')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('plantForm.description.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommended_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.recommended_place.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('plantForm.recommended_place.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <SubmitButton>{t('form.submit')}</SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default PlantForm;
