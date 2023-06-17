import { createContext, useReducer, useContext } from "react";

import Reducer, { initialState } from "./reducer";

interface IUI {
  hiddenSidebar: boolean;
  hideSidebar: Function;
  animatingProgressBar: boolean;
  animateProgressBar: Function;
}

const Context = createContext<any>(initialState);

export function UIProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function hideSidebar(hidden: boolean) {
    dispatch({
      type: "TOGGLE_SIDEBAR",
      payload: {
        hidden,
      },
    });
  }

  function animateProgressBar(animate: boolean) {
    dispatch({
      type: "ANIMATE_PROGRESS_BAR",
      payload: {
        animate,
      },
    });
  }

  const value = {
    hiddenSidebar: state.hiddenSidebar,
    hideSidebar,
    animatingProgressBar: state.animatingProgressBar,
    animateProgressBar,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default function useUI(): IUI {
  const context = useContext(Context);

  return context;
}
