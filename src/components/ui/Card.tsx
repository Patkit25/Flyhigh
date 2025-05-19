import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  bordered = false,
  compact = false,
}) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  const shadowClasses = hoverable 
    ? 'shadow-sm hover:shadow-md transition-shadow duration-300'
    : 'shadow-sm';
  const borderClasses = bordered ? 'border border-gray-200' : '';
  const paddingClasses = compact ? 'p-3' : 'p-6';
  
  return (
    <div className={`${baseClasses} ${shadowClasses} ${borderClasses} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '', overlay }) => {
  return (
    <div className={`relative ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          {overlay}
        </div>
      )}
    </div>
  );
};

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h3 className={`text-xl font-semibold mb-2 ${className}`}>{children}</h3>;
};

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
};

export default Object.assign(Card, {
  Image: CardImage,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
});