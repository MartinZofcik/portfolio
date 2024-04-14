'use client';

import { ModeToggle } from '@/components/ModeToggle';
import { Heart, Sprout } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { LangToggle } from '@/components/LangToggle';
import { Link } from '@/navigation';

const Header = () => {
  const { toast } = useToast();

  return (
    <header className="mx-auto px-4 py-1 bg-gray-100 dark:bg-gray-900 ">
      <div className="flex items-center justify-between ">
        <Link href="/" className="flex items-center pl-4 text-2xl font-medium">
          <Sprout color="#22ac20" className="pr-1" height={50} width={50} />
          {/*Naše kvetinky*/}
        </Link>
        <div className="flex items-center">
          <LangToggle />
          <ModeToggle />
          <Heart
            size={25}
            strokeWidth={2.5}
            color="#ff0000"
            className="ml-6 mb-1 mr-2 hover:cursor-pointer"
            onClick={() => {
              toast({
                title: 'Ľúbim Ťa <3',
                description: 'ty tlustá kačica',
                // action: <ToastAction altText="gud">Dobre ti tak</ToastAction>,
              });
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
