import classnames from "../../../utils/classnames";

export default function DotsLoader({
  showLoadingText = true,
  center = true,
}: {
  showLoadingText?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={classnames(
        "absolute flex flex-col items-center justify-center gap-2 align-middle",
        center ? "-inset-0" : ""
      )}
    >
      <div className="lds-ellipsis">
        <div className="left-[8px] h-4 w-4 rounded-md"></div>
        <div className="left-[8px] h-4 w-4 rounded-md"></div>
        <div className="left-[32px] h-4 w-4 rounded-md"></div>
        <div className="left-[56px] h-4 w-4 rounded-md"></div>
      </div>
      {showLoadingText && <p className="text-gray-400">Loading...</p>}
    </div>
  );
}
