export default function listenForOutsideClicks(
  listening: boolean,
  setListening: any,
  menuRef: any,
  setIsOpen: any
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;

    setListening(true);

    [`click`, `touchstart`].forEach(() => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef.current?.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  };
}
