import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
export default function WithTransitionEffect(props: any) {
    const { inProp } = props;
    console.log('WithTransitionEffect rendered')
    const duration = 1000;
    const defaultStyles = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 1
    };

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    };

    type TransitionStateType = "entering" | "entered" | "exiting" | "exited";
    return (
        <Transition in={inProp} timeout={duration}>
            {(state: TransitionStateType) => {
                console.log(state);
                return <div
                    {...props}
                    style={{ ...defaultStyles, ...transitionStyles[state] }}
                />
            }}
        </Transition>
    );
}
