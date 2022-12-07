import * as React from 'react';
import useScript from 'react-script-hook';
import { StartOptions } from './entities/StartOptions';

type ConnectStatus = 'closed' | 'opening' | 'open';

function useBlissConnect({ connectUrl }: { connectUrl?: string } = {}) {
  const [status, setStatus] = React.useState<ConnectStatus>('closed');
  const [options, setOptions] = React.useState<StartOptions>();
  const [loading, error] = useScript({
    src: connectUrl || 'http://localhost:3000/vite-dev/entrypoints/connect.ts',
    checkForExisting: true,
  });

  React.useEffect(() => {
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

  const startConnect = React.useCallback(
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

export { useBlissConnect };
