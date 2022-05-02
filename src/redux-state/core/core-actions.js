function setAccessToken(accessToken) {
  return (dispatch) => {
    dispatch({ type: "SET_ACCESS_TOKEN", data: accessToken });
  };
}

function setAuthResponse(response) {
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_RESPONSE", data: response });
  };
}

function setUserInfo(info) {
  return (dispatch) => {
    dispatch({ type: "SET_USER_INFO", data: info });
  };
}

function setAuthReset() {
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_RESET" });
  };
}

export const CoreActions = {
  setAccessToken,
  setAuthResponse,
  setUserInfo,
  setAuthReset,
};
