import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
