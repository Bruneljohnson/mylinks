import { useReducer } from "react";

const inputReducer = (state, action) => {
  if (action.type === `INPUT`) {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }

  if (action.type === `BLUR`) {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === `CLEAR`) {
    return {
      value: ``,
      isTouched: false,
    };
  }
};
const useInput = (validateInput) => {
  const [inputState, dispatchInputStateActions] = useReducer(inputReducer, {
    value: ``,
    isTouched: false,
  });

  const isInputValid = validateInput(inputState.value);
  const hasError = !isInputValid && inputState.isTouched;

  const inputValueChangeHandler = (event) => {
    dispatchInputStateActions({ type: `INPUT`, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInputStateActions({ type: `BLUR` });
  };

  const clearInput = () => {
    dispatchInputStateActions({ type: `CLEAR` });
  };

  return {
    value: inputState.value,
    isValid: isInputValid,
    error: hasError,
    inputHandler: inputValueChangeHandler,
    blurHandler: inputBlurHandler,
    clear: clearInput,
  };
};

export default useInput;
