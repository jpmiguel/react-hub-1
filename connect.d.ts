interface Account {
  id: string;
  provider: string;
}

interface StartOptions {
  sessionToken: string;
  apiUrl?: string;
  onSuccess?: (account: Account) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

class Connect {
  static start: (options: StartOptions) => void;
}
