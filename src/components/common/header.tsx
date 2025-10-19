'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'; //
import { Button } from '../ui/button';

const Header = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="truncate text-base sm:text-xl">{/*venue.name*/ '콘서트장 이름'}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {/*venue.location*/ '서울특별시 강남구 삼성동 123-45'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
