import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = 'py-3 px-6 rounded-xl font-medium focus:outline-none ' + className;
  const styles = {
    primary: 'bg-secondary text-white hover:brightness-110',
    secondary: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
  } as const;

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}