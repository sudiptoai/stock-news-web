interface Props {
  message?: string;
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }: Props) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 max-w-md text-center">
        <p className="font-medium">Error</p>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}
