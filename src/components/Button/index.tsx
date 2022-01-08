import React, { ReactElement } from 'react';

export interface ButtonProps {
  icon?: ReactElement;
  text?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
     className="p-1 flex gap-1 items-center text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500 dark:hover:text-yellow-300 active:opacity-50 transition-all select-none rounded-sm focus:outline focus:outline-2 focus:outline-yellow-300 dark:focus:outline-yellow-600"
     onClick={onClick}
    >
      {icon && (<div className="text-2xl">{icon}</div>)}
      {text && (<span>{text}</span>)}
    </button>
  )
}

