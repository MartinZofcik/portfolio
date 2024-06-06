'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plant, Size } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';
import { createPlantSchema, PlantSchema } from '@/lib/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { TreflePlant } from '@/app/api/trefle/trefle.dto';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    trefle_name: plant?.trefle_name ?? '',
    size: plant?.size ?? Size.MEDIUM,
    description: plant?.description ?? '',
    recommended_place: plant?.recommended_place ?? '',
  };

  const form = useForm<PlantSchema>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: initialPlant,
  });

  const [plantOptions, setPlantOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [plantQuery, setPlantQuery] = useState('');
  const [queryString] = useDebounce(plantQuery, 1000);

  useEffect(() => {
    queryString.length > 3 &&
      axios.get(`/api/trefle?plant_name=${queryString}`).then((res) => {
        const plantResponse: TreflePlant[] = res?.data?.data?.data;
        const plantOptions = plantResponse?.map((plant) => ({
          label: plant?.scientific_name,
          value: plant?.scientific_name,
        }));
        setPlantOptions(plantOptions);
      });
  }, [queryString]);

  // const languages = [
  //   { label: 'English', value: 'en' },
  //   { label: 'French', value: 'fr' },
  //   { label: 'German', value: 'de' },
  //   { label: 'Spanish', value: 'es' },
  //   { label: 'Portuguese', value: 'pt' },
  //   { label: 'Russian', value: 'ru' },
  //   { label: 'Japanese', value: 'ja' },
  //   { label: 'Korean', value: 'ko' },
  //   { label: 'Chinese', value: 'zh' },
  // ] as const;

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
          name="trefle_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('plantForm.fields.trefle_name.title')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? plantOptions.find(
                            (plant) => plant.value === field.value,
                          )?.label
                        : t('plantForm.fields.trefle_name.button')}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      onInput={(e: any) => setPlantQuery(e?.target?.value)}
                      placeholder={t(
                        'plantForm.fields.trefle_name.placeholder',
                      )}
                    />
                    <CommandEmpty>
                      {t('plantForm.fields.trefle_name.not_found')}
                    </CommandEmpty>
                    <CommandGroup>
                      <ScrollArea>
                        <CommandList>
                          {plantOptions.map((plant) => (
                            <CommandItem
                              value={plant.label}
                              key={plant.label}
                              onSelect={() => {
                                form.setValue('trefle_name', plant.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  plant.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {plant.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('plantForm.fields.trefle_name.description')}
              </FormDescription>
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
