import { MouseEvent } from "react";

export const handleClose = (setOpenSidebar: (open: boolean) => void) => (e: MouseEvent<HTMLDivElement>) => {
  if ((e.target as HTMLElement).id === "screen") {
    setOpenSidebar(false);
  }
};
