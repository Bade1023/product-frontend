import { BehaviorSubject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { APP_LOGIN_URL } from "../constants";
import { ComponentHelper } from "../helper/component.helper";
import { NotificationHelper } from "../helper/notification.helper";
import { CoreActions } from "../redux-state/core/core-actions";
import { createAxios } from "../services/api";
import { authService } from "../services/auth.service";
import { store } from "../store/store";

const refreshTokenSubject = new BehaviorSubject("");

let interceptorsAdded = false;
let isRefreshingToken = false;

export const interceptor = (api) => {
  if (interceptorsAdded) {
    return;
  }

  interceptorsAdded = true;

  const isIgnoreUrl = (url) => {
    const result = url.endsWith("/protocol/openid-connect/token");
    return result;
  };

  const addTokenToRequest = (config, accessToken) => {
    const { url, headers } = config;

    if (accessToken && !isIgnoreUrl(url) && headers.Authorization !== "") {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  };

  const getAccessToken = () => {
    return store.getState().core.authState.access_token;
  };

  const getRefreshToken = () => {
    return store.getState().core.authState.refresh_token;
  };

  const reSendRequest = (api, config, accessToken) => {
    addTokenToRequest(config, accessToken);
    return api(config);
  };

  const cleanAuthencation = () => {
    const { dispatch } = store;
    authService.logOut(getRefreshToken()).finally(() => {
      dispatch(CoreActions.setAuthReset());
      ComponentHelper.navigateAuthencationDirect(window.location.origin);
    });
  };

  const refreshRequest = (api, config) => {
    const { dispatch } = store;

    if (!isRefreshingToken) {
      isRefreshingToken = true;

      refreshTokenSubject.next("");

      authService
        .refreshToken(getRefreshToken())
        .then((response) => {
          const { access_token } = response;

          dispatch(CoreActions.setAuthResponse(response));

          refreshTokenSubject.next(access_token);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(() => {
          const token = refreshTokenSubject.getValue();

          if (token.length == 0) {
            cleanAuthencation();
          }
        });
    }
    return new Promise((resolve, reject) => {
      refreshTokenSubject
        .pipe(
          filter((accessToken) => accessToken.length > 0),
          take(1)
        )
        .subscribe((accessToken) => {
          reSendRequest(api, config, accessToken)
            .then((response) => {
              isRefreshingToken = false;
              resolve(handlerResponse(response));
            })
            .catch((error) => {
              isRefreshingToken = false;
              reject(error);
              cleanAuthencation();
            });
        });
    });
  };

  const handlerResponse = (response) => {
    const { data, config } = response;

    const { url } = config;

    if (url.startsWith(`${APP_LOGIN_URL}/auth`) || data.code == "SUCCESS") {
      return data;
    }

    if (data.info) {
      NotificationHelper.notify("error", "Алдаа гарлаа", data.info);
    }

    return Promise.reject(data);
  };

  api.interceptors.request.use(
    (config) => {
      addTokenToRequest(config, getAccessToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(handlerResponse, (failureRes) => {
    const { response, config } = failureRes;

    const { status, data } = response || {
      status: 0,
      data: { info: "Холболт амжилтгүй болсон" },
    };

    if (status === 0 || data === undefined) {
      NotificationHelper.showNotification(
        "warning",
        (data && data.info) || "Тодорхойгүй алдаа"
      );
      return Promise.reject();
    }

    if (status === 401 && data.code === "UNAUTHORIZED") {
      return refreshRequest(createAxios(), config);
    }

    NotificationHelper.showNotification("warning", data.info);

    return Promise.reject(data);
  });
};
