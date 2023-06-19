import { createContext, useReducer, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAuthUser } from "../../services/auth.service";
import { FETCH_AUTH_USER_KEY } from "../../utils/queryKeys";
import Reducer, { initialState } from "./reducer";

interface IAuth {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: any | null;
  setAuthUser: Function;
}

const Context = createContext<any>(initialState);

export function AuthProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function setAuthUser(user: any | null) {
    dispatch({
      type: "SET_AUTH_USER",
      payload: {
        user,
      },
    });
  }

  useQuery([FETCH_AUTH_USER_KEY], () => fetchAuthUser(), {
    onSuccess: (user: any) => {
      if (user) {
        localStorage.setItem("auth", "1");
        setAuthUser(user);
      } else {
        localStorage.removeItem("auth");
      }
    },
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const value = {
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    setAuthUser,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default function useAuth(): IAuth {
  const context = useContext(Context);

  return context;
}
