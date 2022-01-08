import classNames from 'classnames';
import React, { ReactElement } from 'react';

export interface ButtonProps {
  icon?: ReactElement;
  text?: string;
  onClick?: () => void;
  pressed?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ icon, text, onClick, pressed = false }) => {
  const classes = classNames(
    'p-1 flex gap-1 items-center font-semibold active:opacity-50 transition-all select-none rounded-sm focus:outline focus:outline-2',
    {
      'text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 focus:outline-yellow-600 dark:focus:outline-yellow-400': !pressed,
      'bg-yellow-600 dark:bg-yellow-500 text-white hover:bg-yellow-500 focus:outline-yellow-300 dark:focus:outline-white': pressed,
    }
  );
  return (
    <button className={classes} onClick={onClick}>
      {icon && (<div className="text-2xl">{icon}</div>)}
      {text && (<span>{text}</span>)}
    </button>
  )
}

