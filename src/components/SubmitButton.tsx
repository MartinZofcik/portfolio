'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { ReactNode } from 'react';

const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();
  // console.log(pending);
  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
};

export default SubmitButton;
