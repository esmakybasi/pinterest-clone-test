import React from 'react';
import Header from './header';

const Layout = ({ children }) => {

  return (
    <div>
      {/* Burada diğer layout bileşenlerini dahil edebilirsiniz */}
      <Header />
      <main>
        {children}
      </main>
      <footer>
        {/* Footer bileşeni */}
      </footer>
    </div>
  );
};

export default Layout;
