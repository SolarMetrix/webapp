export default function TagText({ text }: { text: string }): JSX.Element {
  return (
    <span>
      {" "}
      <span className="bg-ebGreen-500 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-semibold text-white">
        {text}
      </span>{" "}
    </span>
  );
}
