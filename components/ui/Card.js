/**
 * Card Component
 * Container réutilisable avec header, body, footer optionnels
 * Variantes: elevated (défaut), bordered, flat
 */

export function Card({
  children,
  header = null,
  footer = null,
  variant = 'elevated',
  className = '',
  ...props
}) {
  const baseClasses = 'rounded-lg overflow-hidden';

  const variants = {
    elevated: 'bg-white shadow-md border border-border',
    bordered: 'bg-white border-2 border-border',
    flat: 'bg-background border border-border',
  };

  const variantClass = variants[variant] || variants.elevated;

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-border bg-background">
          {header}
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && (
        <div className="px-6 py-4 border-t border-border bg-background">
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * CardHeader Component
 * Wrapper pour le header de Card avec titre optionnel
 */
export function CardHeader({ children, title = null, subtitle = null }) {
  return (
    <div>
      {title && <h3 className="text-lg font-bold text-text">{title}</h3>}
      {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
      {children && (
        <div className={title || subtitle ? 'mt-3' : ''}>{children}</div>
      )}
    </div>
  );
}

/**
 * CardBody Component
 * Wrapper pour le contenu principal
 */
export function CardBody({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

/**
 * CardFooter Component
 * Wrapper pour le footer avec actions
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 justify-end ${className}`}>
      {children}
    </div>
  );
}

export default Card;
