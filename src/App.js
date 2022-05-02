import { Suspense, useContext, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import "./App.scss";
import AppBlock, { BlockContext } from "./context/BlockContext";
import Headers from "./layout/header";
import { routes } from "./routes";
import Footers from "./layout/Footer/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { authService } from "./services/auth.service";
import moment from "moment";
import { CoreActions } from "./redux-state/core/core-actions";
import { ComponentHelper } from "./helper/component.helper";

const AppContent = () => {
  const dispatch = useDispatch();
  const blockView = useContext(BlockContext);
  const { authState } = useSelector((state) => state.core);
  const { authencation, expiresInDate } = authState;

  // useEffect(() => {
  //   if (authencation) {
  //     // Нэвтэрцэн хэрэглэгчийн refresh token ийн хугацаа дуусан эсэхийн шалгах
  //     if (moment(expiresInDate).isBefore(moment())) {
  //       onLogout();
  //     } else {
  //       const internalId = setInterval(() => {
  //         // Нэвтэрцэн хэрэглэгчийн refresh token ийн хугацаа дуусан эсэхийн давтан шалгалт хийх 1 секунд тутамд
  //         if (moment(expiresInDate).isBefore(moment())) {
  //           clearInterval(internalId);
  //           onLogout();
  //         }
  //       }, 1000);

  //       return () => {
  //         clearInterval(internalId);
  //       };
  //     }
  //   }
  // });

  // const onLogout = () => {
  //   blockView.block();
  //   authService.logOut(authState.refresh_token).then(
  //     (response) => {
  //       dispatch(CoreActions.setAuthReset());
  //       ComponentHelper.navigateAuthencationDirect(window.location.origin);
  //       blockView.unblock();
  //     },
  //     (error) => {
  //       blockView.unblock();
  //     }
  //   );
  // };

  return (
    <div className="app">
      <div className="middle-container">
        {/* <div className="content">
          {authencation &&
            <Headers onLogout={() => onLogout()} />
          }
          <Suspense fallback>
            {authencation && (
              <div>
                {renderRoutes(routes.primaryRoutes)}
              </div>
            )}
            {renderRoutes(routes.publicRoutes)}
          </Suspense>
          <Footers />
        </div> */}
        <div className="content">
          <Headers />
          <Suspense>
            <div>
              {renderRoutes(routes.publicRoutes)}
            </div>
          </Suspense>
          <Footers />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <AppContent></AppContent>
      </Provider>
      <AppBlock></AppBlock>
    </>
  );
}

export default App;
