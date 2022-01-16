import React from "react";
import { useButtonContext } from "../context/buttonContext";
import WithTransitionEffect from "../WithTransitionEffect";
import styles from "./style.module.scss";
export default function Loader() {
    const { buttonStates: { promiseStates: { loading } } } = useButtonContext();
    return <WithTransitionEffect inProp={loading}>
        <div className={styles.loading} />
    </WithTransitionEffect>;
}
