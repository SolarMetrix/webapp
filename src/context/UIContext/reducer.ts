export const initialState = {
  animatingProgressBar: false,
  hiddenSidebar: false,
};

export default function Reducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        hiddenSidebar: payload.hidden,
      };
    case "ANIMATE_PROGRESS_BAR":
      return {
        ...state,
        animatingProgressBar: payload.animate,
      };
    default:
      console.log(`No case for type ${type} found in uiReducer`);
  }
}
