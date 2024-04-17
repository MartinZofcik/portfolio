import React from 'react';

export default function PageWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-between px-24 py-4">
      {children}
    </div>
  );
}
