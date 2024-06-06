import React from 'react';

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="flex flex-col items-center justify-between sm:px-6 md:px-12 lg:px-24 py-4">
    <div className="flex flex-col items-center justify-between py-4">
      {children}
    </div>
  );
}
