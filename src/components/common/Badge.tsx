import clsx from 'clsx';

interface Props {
  label: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
};

export function Badge({ label, variant = 'default', size = 'sm' }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {label}
    </span>
  );
}
