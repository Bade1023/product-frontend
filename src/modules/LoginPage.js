import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NAuthToken from "../components/auth/nauth-token";
import { BlockContext } from "../context/BlockContext";
import { ComponentHelper } from "../helper/component.helper";
import { CoreActions } from "../redux-state/core/core-actions";
import { authService } from "../services/auth.service";

const LoginPage = () => {
    const dispatch = useDispatch();
    const blockView = useContext(BlockContext);
    const location = useLocation();
    const { authencation } = useSelector((state) => state.core.authState);

    useEffect(() => {
        const isAuthencationRequest = ComponentHelper.isAuthencationRequest(
            location.search
        );

        if (authencation || isAuthencationRequest) {
            return;
        }

        ComponentHelper.navigateAuthencationDirect(window.location.origin);
    }, []);

    return (
        <div className="LoginPage">
            <NAuthToken
                onSuccess={(response, cleanParams) => {
                    dispatch(CoreActions.setAuthResponse(response));
                    authService
                        .userInfo()
                        .then((userInfo) => {
                            dispatch(CoreActions.setUserInfo(userInfo));
                            cleanParams();
                            blockView.unblock();
                        })
                        .catch(() => {
                            cleanParams();
                            blockView.unblock();
                        });
                }}
                onFailure={(cleanParams) => {
                    cleanParams();
                    blockView.unblock();
                    // TODO Тухайн үйдлийг хийх боломжгүй болсон болхоор юуг дуудаж харуулахыг шийдвэрлэх
                    // ComponentHelper.navigateAuthencationDirect(window.location.href);
                }}
            ></NAuthToken>
        </div>
    );
};

export default LoginPage;
