'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { z } from 'zod';
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
import { createPlantAction } from '@/db/actions';
import { createPlantSchema } from '@/app/[locale]/plant/components/schema';

const initialForm = {
  latin_name: '',
};

const PlantForm = () => {
  const form = useForm<z.infer<typeof createPlantSchema>>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: initialForm,
  });

  async function onSubmit(values: z.infer<typeof createPlantSchema>) {
    await createPlantAction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-6/12">
        <FormField
          control={form.control}
          name="latin_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latin Name</FormLabel>
              <FormControl>
                <Input placeholder="Phoenix Canariensis" {...field} />
              </FormControl>
              <FormDescription>Latin Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PlantForm;
