import "./styles.css";
import ButtonContainer from "./ButtonContainer";
import {
  TransitionGroup,
  CSSTransition,
  Transition
} from "react-transition-group";
import { ButtonContextProvider } from "./context/buttonContext";
function demoClickHandler() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success"), 5000);
  });
  promise
    .then((responseVal) => console.log(responseVal))
    .catch((rejectVal) => console.error(rejectVal));
  return promise;
}

export default function App() {
  return <ButtonContextProvider>
    <ButtonContainer text="Submit" clickHandler={demoClickHandler} />
  </ButtonContextProvider>;
}
