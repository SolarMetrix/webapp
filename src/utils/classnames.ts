export default function classnames(...classes: any[]): string {
  return classes.filter(Boolean).join(" ");
}
