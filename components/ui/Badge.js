/**
 * Badge Component
 * Petites étiquettes pour statuts, tags, etc.
 * Variantes: primary, success, warning, error, info, secondary
 * Tailles: sm, md (défaut), lg
 */

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  className = '',
  ...props
}) {
  const baseClasses = 'font-medium rounded-full inline-flex items-center gap-1';

  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
    info: 'bg-info/10 text-info border border-info/20',
    secondary: 'bg-background text-text-secondary border border-border',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <span
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
}

/**
 * BadgeGroup Component
 * Groupe de badges
 */
export function BadgeGroup({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>
  );
}

export default Badge;
