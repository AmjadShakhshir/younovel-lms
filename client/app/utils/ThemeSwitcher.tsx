"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "dark" ? <BiSun onClick={() => setTheme("light")} className="cursor-pointer" size={25} /> : <BiMoon onClick={() => setTheme("dark")} className="cursor-pointer" size={25} fill="black" />}
    </div>
  );
};

export default ThemeSwitcher;
