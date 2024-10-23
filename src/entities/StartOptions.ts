import { Account } from './Account';
import { ConnectStyles } from './ConnectStyles';

export interface StartOptions {
    sessionToken: string;
    apiUrl?: string;
    styles?: ConnectStyles;
    onSuccess?: (account: Account) => void;
    onCancel?: () => void;
    onClose?: () => void;
}
