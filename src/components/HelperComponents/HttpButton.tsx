import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";

type Props = {
  text: string;
  faIcon?: any;
  iconSize?: 4 | 5;
  customClasses: string;
  isLoading: boolean;
  disabled: boolean;
  fnc: Function;
};

export default function HttpButton({
  text,
  faIcon,
  iconSize = 5,
  customClasses,
  isLoading,
  disabled,
  fnc,
}: Props) {
  const size = iconSize === 4 ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-medium ${
        iconSize === 4 ? "text-sm" : "text-base"
      } text-white focus:outline-none ${customClasses} ${
        disabled && "cursor-auto opacity-50"
      }`}
      onClick={() => fnc()}
      disabled={disabled}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <FontAwesomeIcon icon={faIcon} className={`${size} mr-2 text-white`} />
      )}
      {text}
    </button>
  );
}
