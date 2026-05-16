'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import Footer from './Footer';

export default function NavigationWrapper({ children }) {
  const pathname = usePathname();
  
  // Routes that should NOT have the global NavBar and Footer
  const noNavRoutes = ['/dashboard', '/profile', '/settings', '/bookings', '/booking', '/marketplace', '/admin', '/service'];
  
  const shouldHideNav = noNavRoutes.some(route => pathname?.startsWith(route));

  return (
    <>
      {!shouldHideNav && <NavBar transparent />}
      <main className={shouldHideNav ? "" : "pt-20"}>
        {children}
      </main>
      {!shouldHideNav && <Footer />}
    </>
  );
}
