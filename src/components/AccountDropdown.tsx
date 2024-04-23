import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

const AccountDropdown = () => {
  const session = useSession();
  const t = useTranslations('Index');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-3">
        <Avatar>
          {session.data?.user?.image && (
            <>
              <AvatarImage src={session.data?.user?.image} referrerPolicy={"no-referrer"}/>
              <AvatarFallback>AA</AvatarFallback>
            </>

          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2" />
          {t('header.authButton.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
