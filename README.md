# BlissAPI Connect For React
Allow your users to quickly integrate with several services with BlissAPI. The `@blissapi/react-connect`
introduces an easy-to-use React hook for integrating with your web app.

## Install

```
# NPM
npm install --save @blissapi/react-connect

# Yarn
yarn add @blissapi/react-connect
```

## Usage
Use React hook to start the Connect flow. Listen to the callbacks to know when an account has been linked or whether
the flow has been cancelled. The callback will give you the information about the account added/updated - you may
also retrieve this information by using webhooks or the API.

```jsx
import { useBlissConnect } from '@blissapi/react-component';

const LinkAccountButton = () => {
  const { start } = useBlissConnect();

  const startFlow = useCallback(async () => {
    const sessionToken = await retrieveConnectSessionToken();
    start({ sessionToken });
  }, [start]);

  return (
    <button onClick={startFlow}>Connect Account</button>
  );
};
```

### Connect Options
When starting the flow, you may pass a few options:
```jsx
const { start } = useBlissConnect();

start(options)
```

| Name                    | Type        | Required    | Description         |
| ----------------------- | ----------- | ----------- | ------------------- |
| **sessionToken**        | string      | **Yes**     | Connect session token created in the backend. The session token allows users to manage their accounts in the frontend. You may limit a connect session token to selected categories or to a given service
| **apiUrl**              | string      | No          | Which API instance should it connect to. It will automatically infer it from your connect session.
| **onSuccess(account)**  | function    | No          | Called when an account is successfully linked. The `account` param gives you information about the linked account.
| **onCancel()**          | function    | No          | Called when the connect flow is closed without an account being linked.
| **onClose()**           | function    | No          | Called every time the connect flow is closed regardless of whether an account has been linked or not.
