import { useEffect, useState } from "react";

export default function useOpenState(initialState = false) {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const toggleOpen = () => setOpen(!open);

  return { open, setOpen, toggleOpen };
}
