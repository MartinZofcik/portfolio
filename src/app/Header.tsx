'use client';

import ModeToggle from '@/components/ModeToggle';
import { Heart, Sprout } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LangToggle from '@/components/LangToggle';
import { Link } from '@/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import AccountDropdown from '@/components/AccountDropdown';

const Header = () => {
  const { toast } = useToast();
  const t = useTranslations('Index');
  const session = useSession();

  console.log(session);

  return (
    <header className="mx-auto px-4 py-1 bg-gray-100 dark:bg-gray-900 ">
      <div className="flex items-center justify-between ">
        <Link href="/" className="flex items-center pl-4 text-2xl font-medium">
          <Sprout color="#22ac20" className="pr-1" height={50} width={50} />
          {/*Naše kvetinky*/}
        </Link>
        <div className="flex items-center">
          <Heart
            size={25}
            strokeWidth={2.5}
            color="#ff0000"
            className="mb-1 mr-4 hover:cursor-pointer"
            onClick={() => {
              toast({
                title: 'Ľúbim Ťa <3',
                description: 'ty tlustá kačica',
                // action: <ToastAction altText="gud">Dobre ti tak</ToastAction>,
              });
            }}
          />
          <LangToggle />
          <ModeToggle />
          {session.data ? (
            <AccountDropdown />
          ) : (
            <Button className="ml-3" onClick={() => signIn('google')}>
              {t('header.authButton.signIn')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
