import {
  CODE_PROPERTY_NAME,
  SESSION_STATE_PROPERTY_NAME,
} from "../components/auth/nauth-token";
import { APP_CLIENT_TOKEN, APP_DIRECT_LOGIN_URL } from "../constants";

const navigateAuthencationDirect = (redirectUri, responseType = "code") => {
  const urlFragment = `${APP_DIRECT_LOGIN_URL}?response_type=${responseType}&client_id=${APP_CLIENT_TOKEN}&redirect_uri=${redirectUri}`;
  console.log(urlFragment);
  window.location.href = urlFragment;
};

function isAuthencationRequest(urlFragment) {
  const urlSearchParam = new URLSearchParams(urlFragment);
  return (
    urlSearchParam.has(CODE_PROPERTY_NAME) &&
    urlSearchParam.has(SESSION_STATE_PROPERTY_NAME)
  );
}

function isLocalHost() {
  const { hostname } = window.location;
  return hostname == "localhost";
}

export const ComponentHelper = {
  isLocalHost,
  navigateAuthencationDirect,
  isAuthencationRequest,
};
