export const authConfig = {
  clientId: "test-fit",
  authorizationEndpoint:
    "http://localhost:8181/realms/fitness_app/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/fitness_app/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173",
  scope: "openid profile email offline_access",
  onRefreshTokenExpire: (event) => event.logIn(),
};
