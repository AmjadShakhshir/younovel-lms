import { useState, useEffect, useCallback } from "react";

export const useScrollActive = (threshold: number) => {
  const [active, setActive] = useState(false);

  // Create the scroll event handler using useCallback to memoize it
  const handleScroll = useCallback(() => {
    if (window.scrollY > threshold) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [threshold]); // Only recreate the handler when 'threshold' changes

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts or if 'threshold' changes
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Dependency on 'handleScroll', which changes when 'threshold' does

  return active;
};
