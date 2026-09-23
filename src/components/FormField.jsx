'use client';

export default function FormField({ label, type = 'text', value, onChange, placeholder, required = false, error, disabled = false, isKiosk = false, className = '', maxLength, children }) {
  const inputCls = `${isKiosk ? 'glass-input-lg' : 'glass-input'} ${error ? 'input-error' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;
  return (
    <div className="w-full">
      {label && (
        <label className={isKiosk ? 'label-lg' : 'label'}>
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      {children || (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          disabled={disabled} maxLength={maxLength} className={inputCls} />
      )}
      {error && (
        <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zM8 11a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
