export const AwsConfigAuth = {
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_APP_AUTH_REGION,
      userPoolId: import.meta.env.VITE_APP_AUTH_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
      cookieStorage: {
        domain: import.meta.env.VITE_APP_AUTH_COOKIE_STORAGE_DOMAIN,
        path: '/',
        expires: 7,
        sameSite: 'strict',
        secure: false
      }
    }
  }
};