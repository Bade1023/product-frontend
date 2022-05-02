import moment from "moment";

const initAuth = {
  fetch: false,
  expiresInDate: "",
  access_token: "",
  refresh_token: "",
  refresh_expires_in: 0,
  username: "",
  imageUrl: "",
  authencation: false,
  userInfo: {},
};

const initValues = {
  authState: initAuth,
};

export function CoreReducer(state = initValues, action) {
  const { type, data } = action;
  const { authState } = state;

  switch (type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        authState: {
          ...authState,
          accessToken: data,
        },
      };
    case "SET_AUTH_RESPONSE":
      const expiresInDate = moment()
        .add(data.refresh_expires_in, "seconds")
        .toString();
      return {
        ...state,
        authState: {
          ...authState,
          fetch: data ? true : false,
          expiresInDate: expiresInDate,
          authencation: data ? true : false,
          ...data,
        },
      };
    case "SET_USER_INFO":
      return {
        ...state,
        authState: {
          ...authState,
          userInfo: data,
          username: data.name,
        },
      };
    case "SET_AUTH_RESET":
      return {
        ...state,
        authState: initAuth,
      };
    default:
      return state;
  }
}
