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
      className="text-md inline-flex w-[11rem] items-center justify-center rounded-md border border-transparent bg-ebGreen-500 py-2 font-bold text-white shadow-lg transition hover:bg-ebGreen-600 hover:shadow-md md:py-3"
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
