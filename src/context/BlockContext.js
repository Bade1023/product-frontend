import { Spin } from "antd";
import React, { useReducer } from "react";

function BlockContextImpl(value) {
  let state = { ...value };
  let dispatch = undefined;

  const iniReducer = (value) => {
    if (!value || value.length < 0) {
      throw new Error("reduce not implemented.");
    }

    state = value[0];
    dispatch = value[1];
  };

  const reducer = (state, action) => {
    return action;
  };

  const isBlock = () => {
    return state;
  };

  const block = () => {
    setBlock(true);
  };

  const unblock = () => {
    setBlock(false);
  };

  const setBlock = (value) => {
    dispatch && dispatch(value);
  };

  return {
    iniReducer: iniReducer,
    reducer: reducer,
    isBlock: isBlock,
    block: block,
    unblock: unblock,
  };
}

const provider = new BlockContextImpl(false);

export const BlockContext = React.createContext(provider);

/** Үндсэн үйлдэл block хийж үйлдэл хийх боломжгүй болгох зорилготой */
const AppBlock = () => {
  provider.iniReducer(useReducer(provider.reducer, false));

  return (
    <BlockContext.Consumer>
      {(context) =>
        context.isBlock() ? (
          <div className="app-container-block">
            <Spin />
          </div>
        ) : (
          <></>
        )
      }
    </BlockContext.Consumer>
  );
};

export default AppBlock;
