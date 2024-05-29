'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { createPlantSchema, PlantSchema } from '@/lib/types';

interface TPlantFormProps {
  onSubmit: (data: PlantSchema) => void;
  plant?: Plant;
}

// const initialForm = {
//   latin_name: '',
//   slovak_name: '',
//   size: Size.MEDIUM,
//   description: '',
//   recommended_place: '',
// };

const PlantForm: React.FC<TPlantFormProps> = ({ onSubmit, plant = null }) => {
  const t = useTranslations('Index');

  const initialPlant = {
    latin_name: plant?.latin_name ?? '',
    slovak_name: plant?.slovak_name ?? '',
    size: plant?.size ?? Size.MEDIUM,
    description: plant?.description ?? '',
    recommended_place: plant?.recommended_place ?? '',
  };

  const form = useForm<PlantSchema>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: initialPlant,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        // action={createPlantAction}
      >
        <FormField
          control={form.control}
          name="latin_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('plantForm.fields.latin_name')}</FormLabel>
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
              <FormLabel>{t('plantForm.fields.slovak_name')}</FormLabel>
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
              <FormLabel>{t('plantForm.fields.size.title')} </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('plantForm.fields.size.selectSize')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(Object.keys(Size) as Array<keyof typeof Size>).map(
                    (size) => (
                      <SelectItem key={size} value={size}>
                        {t(`plantForm.fields.size.${size}`)}
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
              <FormLabel>{t('plantForm.fields.description.title')}</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder={t('plantForm.fields.description.placeholder')}
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
              <FormLabel>
                {t('plantForm.fields.recommended_place.title')}
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder={t(
                    'plantForm.fields.recommended_place.placeholder',
                  )}
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
