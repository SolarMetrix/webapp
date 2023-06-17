export const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
};

export default function Reducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case "SET_AUTH_USER":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: payload.user ? true : false,
        user: payload.user,
      };
    default:
      console.log(`No case for type ${type} found in uiReducer`);
  }
}
