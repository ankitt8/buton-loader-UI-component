import React from "react";
import { useButtonContext } from "../context/buttonContext";
import WithTransitionEffect from "../WithTransitionEffect";
import styles from "./style.module.scss";

export default function Success() {
  const { buttonStates: { promiseStates: { resolved } } } = useButtonContext();
  return <WithTransitionEffect inProp={resolved}>
    <div className={styles.success}>&#10003;</div>
  </WithTransitionEffect>;
}
