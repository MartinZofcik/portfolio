'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const SignInButton = () => {
  const t = useTranslations('Index');
  return (
    <Button
      className="ml-3"
      onClick={() => signIn('google', { redirect: false })}
    >
      {t('header.authButton.signIn')}
    </Button>
  );
};

export default SignInButton;
