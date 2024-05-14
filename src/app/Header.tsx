'use client';

import ModeToggle from '@/components/ModeToggle';
import { Heart, Sprout } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LangToggle from '@/components/LangToggle';
import { Link } from '@/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import AccountDropdown from '@/components/AccountDropdown';
import SignInButton from '@/components/SignInButton';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Header = () => {
  const { toast } = useToast();
  const t = useTranslations('Index');
  const session = useSession();

  return (
    <header className="mx-auto px-4 py-2 bg-gray-100 dark:bg-slate-900 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center pl-4 text-2xl font-medium"
          >
            <Sprout color="#22ac20" className="mb-1" height={35} width={35} />
            iPlants
          </Link>
          {session.data && (
            <div className="ml-7">
              <Link className={navigationMenuTriggerStyle()} href="/list">
                List
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <Heart
            size={25}
            strokeWidth={2.5}
            color="#ff0000"
            className="mb-1 mr-4 hover:cursor-pointer"
            onClick={() => {
              toast({
                title: 'Ľúbim Ťa',
                description: 'ty tlustá kačica <3',
                // action: <ToastAction altText="gud">Dobre ti tak</ToastAction>,
              });
            }}
          />
          <LangToggle />
          <ModeToggle />
          {session.status === 'authenticated' ? (
            <AccountDropdown />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
