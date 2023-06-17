import { Tooltip } from "@mantine/core";

export default function CustomTooltip({
  children,
  text,
  position = "top",
  offset = 5,
  transition = "fade",
}: {
  children: any;
  text: string | JSX.Element;
  position?: "top" | "right" | "bottom" | "left";
  offset?: number;
  transition?: "pop" | "fade";
}) {
  return (
    <Tooltip
      label={text}
      color="gray"
      withArrow={false}
      arrowSize={5}
      position={position}
      style={{ backgroundColor: "#5C6572", fontSize: "0.8rem" }}
      transition={transition}
      transitionDuration={200}
      offset={offset}
    >
      {children}
    </Tooltip>
  );
}
