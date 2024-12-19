import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function Link({ href, children, icon }: LinkProps) {
  return (
    <RouterLink
      to={href}
      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </RouterLink>
  );
}