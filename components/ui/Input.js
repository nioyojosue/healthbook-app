/**
 * Input Component
 * Types: text, email, password, number, tel, url, search
 * States: normal, error, success, disabled
 */

export function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = false,
  success = false,
  disabled = false,
  label = '',
  helperText = '',
  icon = null,
  required = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'w-full px-4 py-2.5 border rounded-lg font-sans text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-error bg-red-50'
    : success
    ? 'border-success focus:border-success focus:ring-success bg-green-50'
    : 'border-border focus:border-primary focus:ring-primary';

  const disabledClasses = disabled
    ? 'bg-background text-text-light cursor-not-allowed opacity-60'
    : 'bg-white text-text';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${stateClasses} ${disabledClasses} ${
            icon ? 'pl-12' : ''
          } ${className}`}
          {...props}
        />

        {error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-error"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18.101 12.93a1 1 0 00-1.414-1.414L10 15.172l-6.687-6.687a1 1 0 00-1.414 1.414l8.101 8.101a1 1 0 001.414 0l8.101-8.101z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {success && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {helperText && (
        <p
          className={`text-sm mt-2 ${
            error
              ? 'text-error'
              : success
              ? 'text-success'
              : 'text-text-secondary'
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
