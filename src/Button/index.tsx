import React from "react";
import { useButtonContext } from "../context/buttonContext";
import WithTransitionEffect from "../WithTransitionEffect";
import styles from './style.module.scss';
type ButtonPropsType = {
  handleClick: () => void;
  text: string;
};
export default function Button({ text, handleClick }: ButtonPropsType) {
  const { buttonStates: { isButtonClicked } } = useButtonContext();

  return (
    <WithTransitionEffect inProp={!isButtonClicked}>
      <button onClick={handleClick} className={styles.button}>
        {text}
      </button>
    </WithTransitionEffect>
  );
}
