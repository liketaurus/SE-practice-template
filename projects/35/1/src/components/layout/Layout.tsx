import { FC, PropsWithChildren } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const Layout: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
