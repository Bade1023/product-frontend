import { Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { CoreActions } from "../redux-state/core/core-actions";
import { authService } from "../services/auth.service";
import { useContext } from "react";
import { BlockContext } from "../context/BlockContext";
import { ComponentHelper } from "../helper/component.helper";

const Headers = ({ onLogout }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const blockView = useContext(BlockContext);
  const { authState } = useSelector((state) => state.core);

  const onLogOutBKP = () => {
    blockView.block();
    authService.logOut(authState.refresh_token).then(
      (response) => {
        dispatch(CoreActions.setAuthReset());
        ComponentHelper.navigateAuthencationDirect(window.location.origin);
        blockView.unblock();
      },
      (error) => {
        blockView.unblock();
      }
    );
  };

  const menus = (
    <Menu className="profile-dropdown">
      <Menu.Item key="0" className="profile-dropdown-item"></Menu.Item>
      <Menu.Item key="1" className="profile-dropdown-item">
        <Button
          onClick={() => {
            onLogOutBKP();
          }}
        >
          Гарах
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
      />
      {/* {authState.authencation && (
        <Dropdown
          className={"header-usermain"}
          overlay={menus}
          trigger={["click"]}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <span className="username">{authState.username}</span>
          </a>
        </Dropdown>
      )} */}
    </Header>
  );
};

export default Headers;
