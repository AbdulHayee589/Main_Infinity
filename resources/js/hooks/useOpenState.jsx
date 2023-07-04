import { useEffect, useState } from "react";

export default function useOpenState(initialState = false) {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return { open, setOpen };
}
