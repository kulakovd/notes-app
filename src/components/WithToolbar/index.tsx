import React, { ReactNode } from 'react';

interface WithToolbarProps {
  toolbar: ReactNode;
}

export const WithToolbar: React.FC<WithToolbarProps> = ({ toolbar, children }) => (
  <div className="h-full flex flex-col-reverse md:flex-col">
    <div className="py-1 bg-white dark:bg-neutral-800 md:border-b md:dark:border-gray-900" style={{ minHeight: 42 }}>
      {toolbar}
    </div>
    <div className="flex-1 max-h-full overflow-hidden">{children}</div>
  </div>
);
