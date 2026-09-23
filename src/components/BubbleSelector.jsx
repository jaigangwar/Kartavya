'use client';

export default function BubbleSelector({ label, options, value, onChange, compact = false, isKiosk = false }) {
  return (
    <div className={compact ? 'mb-2' : 'mb-4'}>
      {label && (
        <p className={`font-semibold mb-2 ${compact ? 'text-[10px] uppercase tracking-wider text-slate-700' : isKiosk ? 'text-lg text-slate-800 dark:text-slate-200' : 'text-sm text-slate-800 dark:text-slate-200'}`}>
          {label}
        </p>
      )}
      <div className={compact ? 'space-y-0.5' : isKiosk ? 'space-y-3' : 'space-y-1.5'}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label key={opt.value}
              className={`flex items-center gap-2 cursor-pointer group ${compact ? 'py-0.5' : isKiosk ? 'py-2' : 'py-1.5'}`}
              onClick={() => onChange(opt.value)}>
              <span className={`flex-shrink-0 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                ${compact ? 'w-3.5 h-3.5' : isKiosk ? 'w-6 h-6' : 'w-5 h-5'}
                ${isSelected
                  ? opt.color ? '' : 'border-brand bg-brand'
                  : 'border-slate-300 group-hover:border-slate-400'}`}
                style={isSelected && opt.color ? { borderColor: opt.color, backgroundColor: opt.color } : {}}>
                {isSelected && <span className={`rounded-full bg-white ${compact ? 'w-1 h-1' : isKiosk ? 'w-2.5 h-2.5' : 'w-2 h-2'}`} />}
              </span>
              <span className={`transition-colors duration-200
                ${compact ? 'text-[10px] leading-tight' : isKiosk ? 'text-lg' : 'text-sm'}
                ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-800'}`}
                style={isSelected && opt.color ? { color: opt.color } : {}}>
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
