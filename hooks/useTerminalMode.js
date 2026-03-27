"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TerminalModeContext = createContext({
  isTerminalMode: false,
  toggleTerminalMode: () => {},
});

export function TerminalModeProvider({ children }) {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("terminal-mode") === "true";
    setIsTerminalMode(saved);
  }, []);

  useEffect(() => {
    if (isTerminalMode) {
      document.documentElement.classList.add("terminal-mode");
    } else {
      document.documentElement.classList.remove("terminal-mode");
    }
    localStorage.setItem("terminal-mode", isTerminalMode);
  }, [isTerminalMode]);

  const toggleTerminalMode = () => setIsTerminalMode((prev) => !prev);

  return (
    <TerminalModeContext.Provider value={{ isTerminalMode, toggleTerminalMode }}>
      {children}
    </TerminalModeContext.Provider>
  );
}

export const useTerminalMode = () => useContext(TerminalModeContext);
