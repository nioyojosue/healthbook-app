/**
 * Button Component
 * Variantes: primary (défaut), secondary, danger, outline
 * Tailles: sm, md (défaut), lg
 */

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseClasses =
    'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary:
      'bg-background text-text border border-border hover:bg-opacity-80 focus:ring-primary',
    danger:
      'bg-error text-white hover:bg-red-700 focus:ring-error',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
