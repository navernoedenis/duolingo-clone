import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

export const useAction = <T,>({
  action,
  onSuccess,
}: {
  action: (data: T) => Promise<{ error: string } | undefined>;
  onSuccess?: VoidFunction;
}) => {
  const [pending, startTransition] = useTransition();

  const run = useCallback(
    (data: T) => {
      startTransition(() => {
        action(data)
          .then((response) => {
            if (response?.error) {
              toast.error(response.error);
            } else {
              onSuccess?.();
            }
          })
          .catch((error) => toast.error(JSON.stringify(error)));
      });
    },
    [action, onSuccess]
  );

  return { run, pending };
};
