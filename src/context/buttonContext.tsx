import React, { useReducer, useContext } from 'react';
type ButtonStates = {
    isButtonClicked: boolean,
    promiseStates: {
        loading: boolean,
        rejected: boolean,
        resolved: boolean
    }
};
type ACTION_TYPESType = {
    BUTTON_CLICKED: 'BUTTON_CLICKED',
    PROMISE_LOADING: 'PROMISE_LOADING',
    PROMISE_RESOLVED: 'PROMISE_RESOLVED',
    PROMISE_REJECTED: 'PROMISE_REJECTED'
};
const ACTION_TYPES: ACTION_TYPESType = {
    BUTTON_CLICKED: 'BUTTON_CLICKED',
    PROMISE_LOADING: 'PROMISE_LOADING',
    PROMISE_RESOLVED: 'PROMISE_RESOLVED',
    PROMISE_REJECTED: 'PROMISE_REJECTED'
};
// @ts-ignore
// type ActionTypesKey = 'BUTTON_CLICKED' | 'PROMISE_LOADING' | 'PROMISE_RESOLVED' | 'PROMISE_REJECTED'
type ActionTypesKey = keyof typeof ACTION_TYPES;

type ActionType = {
    type: ActionTypesKey
}

type ButtonContextValue = {
    buttonStates: ButtonStates,
    dispatch: (action: ActionType) => void
}

const ButtonContext = React.createContext<ButtonContextValue>({} as ButtonContextValue);

function ButtonContextProvider(props: any) {
    const initialState: ButtonStates = {
        isButtonClicked: false,
        promiseStates: {
            loading: false,
            rejected: false,
            resolved: false
        }
    };
    const [buttonStates, dispatch] = useReducer((state: ButtonStates, action: ActionType) => {
        switch (action.type) {
            case ACTION_TYPES.BUTTON_CLICKED: {
                return {
                    ...state, isButtonClicked: true
                }
            }
            case ACTION_TYPES.PROMISE_LOADING: {
                return {
                    ...state, promiseStates: {
                        loading: true,
                        resolved: false,
                        rejected: false
                    }
                }
            }
            case ACTION_TYPES.PROMISE_RESOLVED: {
                return {
                    ...state, promiseStates: {
                        loading: false,
                        resolved: true,
                        rejected: false
                    }
                }
            }
            case ACTION_TYPES.PROMISE_RESOLVED: {
                return {
                    ...state, promiseStates: {
                        loading: false,
                        resolved: false,
                        rejected: true
                    }
                }
            }
            default: {
                throw new Error(`ACTION TYPES MUST BE ON OF FOLLOWING ${ACTION_TYPES}`);
            }
        }
    }, initialState);
    return <ButtonContext.Provider value={{ buttonStates, dispatch }} {...props} />

}

const useButtonContext = (): ButtonContextValue => {
    const buttonContext = useContext(ButtonContext);
    if (!buttonContext) {
        throw new Error('ButtonContext must be used inside ButtonContextProvider');
    }
    return buttonContext;
}

export { ButtonContextProvider, useButtonContext, ACTION_TYPES };