import { useState } from "react";
import Loader from "../Loader";
import Success from "../Success";
import Button from "../Button";
import { IButtonProps } from "./interface";
import { ACTION_TYPES, useButtonContext } from "../context/buttonContext";
export default function ButtonContainer({ text, clickHandler }: IButtonProps) {
  const { buttonStates, dispatch } = useButtonContext();
  const { isButtonClicked, promiseStates: {
    loading,
    resolved
  } } = buttonStates;
  const handleClick = () => {
    dispatch({ type: ACTION_TYPES.BUTTON_CLICKED })
    const promise = clickHandler();

    try {
      dispatch({ type: ACTION_TYPES.PROMISE_LOADING });
      promise.then(
        function promiseSuccess() {
          dispatch({ type: ACTION_TYPES.PROMISE_RESOLVED })
        },
        function promiseFailure() {
          dispatch({ type: ACTION_TYPES.PROMISE_REJECTED })
        }
      );
    } catch (e) {
      console.error(e);
      throw new Error("Something went wrong");
    }
  };

  let componentToRender = null;
  if (!isButtonClicked) {
    componentToRender = <Button handleClick={handleClick} text={text} />;
  } else if (loading) {
    componentToRender = <Loader />;
  } else if (resolved) {
    componentToRender = <Success />;
  } else {
    componentToRender = null;
  }
  return (
    !isButtonClicked ? <Button handleClick={handleClick} text={text} /> :
      loading ? <Loader /> : <Success />
  )

}

