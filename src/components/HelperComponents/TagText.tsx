export default function TagText({ text }: { text: string }): JSX.Element {
  return (
    <span>
      {" "}
      <span className="whitespace-nowrap rounded-md bg-ebGreen-500 px-1.5 py-0.5 text-xs font-semibold text-white">
        {text}
      </span>{" "}
    </span>
  );
}
