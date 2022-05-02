import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { BlockContext } from "../../context/BlockContext";
import { NotificationHelper } from "../../helper/notification.helper";
import { authService } from "../../services/auth.service";

export const SESSION_STATE_PROPERTY_NAME = "session_state";
export const CODE_PROPERTY_NAME = "code";

const NAuthToken = (props) => {
  const location = useLocation();
  const history = useHistory();
  const blockView = useContext(BlockContext);
  const { authencation } = useSelector((state) => state.core.authState);

  const { onSuccess, onFailure } = props;

  const urlSearchParam = new URLSearchParams(location.search);

  useEffect(() => {
    const sessionState = urlSearchParam.get(SESSION_STATE_PROPERTY_NAME);
    const code = urlSearchParam.get(CODE_PROPERTY_NAME);

    if (sessionState && code && !authencation) {
      blockView.block();
      authService
        .authToken(code, window.location.origin)
        .then((response) => {
          onSuccess && onSuccess(response, cleanParams);
        })
        .catch((error) => {
          onFailure && onFailure(cleanParams);
        });

    }

    if (sessionState && code && authencation) {
      NotificationHelper.notify(
        "warning",
        "Анхааруулга",
        "Та аль хэдийн нэвтэрцэн байна."
      );
      onFailure && onFailure(cleanParams);
    }
  }, []);

  const cleanParams = () => {
    urlSearchParam.delete(SESSION_STATE_PROPERTY_NAME);
    urlSearchParam.delete(CODE_PROPERTY_NAME);
    history.replace({
      search: urlSearchParam.toString(),
    });
  };

  return <></>;
};

export default NAuthToken;
