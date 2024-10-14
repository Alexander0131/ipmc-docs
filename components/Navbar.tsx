import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';
import AddItem from './AddItem';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
         src="/icons/logo-ipmc.png"
         width={55}
         height={27}
         alt='ipmc-logo'
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          IPMC DOCS
        </p>
      </Link>
      <div className="flex-between gap-2 relative">
        <AddItem />
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
