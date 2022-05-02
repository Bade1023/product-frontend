import { APP_CLIENT_TOKEN, APP_REALM } from "../constants";
import api from "./api";

const authToken = (code, redirectUri) => {
  const dataParam = {
    code: code,
    client_id: APP_CLIENT_TOKEN,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };
  return api.post(
    `/auth/realms/${APP_REALM}/protocol/openid-connect/token`,
    new URLSearchParams(dataParam),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const userInfo = () => {
  return api.get(`/auth/realms/${APP_REALM}/protocol/openid-connect/userinfo`);
};

const refreshToken = (token) => {
  const body = {
    client_id: APP_CLIENT_TOKEN,
    grant_type: "refresh_token",
    refresh_token: token,
  };

  return api.post(
    `/auth/realms/${APP_REALM}/protocol/openid-connect/token`,
    new URLSearchParams(body)
  );
};

const logOut = (token) => {
  const body = {
    client_id: APP_CLIENT_TOKEN,
    refresh_token: token,
  };

  return api.post(
    `/auth/realms/${APP_REALM}/protocol/openid-connect/logout`,
    new URLSearchParams(body)
  );
};

export const authService = {
  authToken,
  userInfo,
  refreshToken,
  logOut,
};
