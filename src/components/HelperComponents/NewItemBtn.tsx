import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewItemBtn({
  text,
  onclickFn,
  icon,
  iconSize = 5,
}: {
  text: string;
  onclickFn: Function;
  icon: any;
  iconSize?: number;
}) {
  return (
    <button
      type="button"
      title={text}
      className="text-md bg-ebGreen-500 hover:bg-ebGreen-600 inline-flex w-[11rem] items-center justify-center rounded-md border border-transparent py-2 font-bold text-white shadow-lg transition hover:shadow-md md:py-3"
      onClick={() => onclickFn()}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`w-${iconSize} h-${iconSize} mr-2 text-white`}
      />
      {text}
    </button>
  );
}
