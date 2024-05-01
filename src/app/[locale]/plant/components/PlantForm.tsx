'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
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
import { createPlantAction } from '@/db/actions/plant';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select';

const Size = {
  VERY_SMALL: 'VERY_SMALL',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  VERY_LARGE: 'VERY_LARGE',
};

const initialForm = {
  latin_name: '',
  slovak_name: '',
  size: '',
  description: '',
  recommended_place: '',
};

const PlantForm = () => {
  const t = useTranslations('Index');
  const form = useForm<z.infer<typeof createPlantSchema>>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: initialForm,
  });

  async function onSubmit(values: z.infer<typeof createPlantSchema>) {
    await createPlantAction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/12">
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
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="size"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>Email</FormLabel>*/}
        {/*      <Select onValueChange={field.onChange}>*/}
        {/*        <FormControl>*/}
        {/*          <SelectTrigger>*/}
        {/*            <SelectValue placeholder="Select size" />*/}
        {/*          </SelectTrigger>*/}
        {/*        </FormControl>*/}
        {/*        <SelectContent>*/}
        {/*          <SelectItem value="m@example.com">m@example.com</SelectItem>*/}
        {/*          <SelectItem value="m@google.com">m@google.com</SelectItem>*/}
        {/*          <SelectItem value="m@support.com">m@support.com</SelectItem>*/}
        {/*        </SelectContent>*/}
        {/*      </Select>*/}
        {/*      /!*<FormDescription>*!/*/}
        {/*      /!*  You can manage email addresses in your{" "}*!/*/}
        {/*      /!*  <Link href="/examples/forms">email settings</Link>.*!/*/}
        {/*      /!*</FormDescription>*!/*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
        <SubmitButton>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PlantForm;
