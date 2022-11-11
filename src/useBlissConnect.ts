import { useCallback, useEffect, useState } from 'react';
import useScript from 'react-script-hook';

type ConnectStatus = 'closed' | 'opening' | 'open';

export const useBlissConnect = ({ connectUrl }: { connectUrl?: string }) => {
  const [status, setStatus] = useState<ConnectStatus>('closed');
  const [options, setOptions] = useState<StartOptions>();
  const [loading, error] = useScript({
    src: connectUrl || 'http://localhost:3000/vite-dev/entrypoints/connect.ts',
    checkForExisting: true,
  });

  useEffect(() => {
    if (status === 'open' || status === 'closed') return;
    if (error) {
      if (status === 'opening') setStatus('closed');
      return;
    }
    if (loading) return;

    if (status === 'opening' && options) {
      setStatus('open');
      Connect.start({
        ...options,
        onClose: () => {
          setStatus('closed');
          options.onCancel?.();
        },
      });
    }
  }, [error, loading, status, options]);

  const startConnect = useCallback(
    (options: StartOptions) => {
      if (error) throw 'Could not initiate BlissConnect.';
      if (status === 'open') return;

      setOptions(options);
      setStatus('opening');
    },
    [loading, error],
  );

  return { startConnect };
};
