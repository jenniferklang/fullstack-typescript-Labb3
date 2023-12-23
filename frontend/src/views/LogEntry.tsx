// LogEntry.tsx

import React from "react";
import { Log } from "./Log";
import "../App.css";

interface LogEntryProps {
  log: Log;
  onSelect: (entry_id: number) => void;
  isSelected: boolean;
}

const LogEntry: React.FC<LogEntryProps> = ({ log, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(log.entry_id);
  };

  return (
    <div className={`log-entry ${isSelected ? "selected" : ""}`}>
      <p onClick={handleClick}>Innehåll: {log.content}</p>
      {/* Behåll bara "Ta bort" -knappen */}
      <button>Ta bort</button>
    </div>
  );
};

export default LogEntry;
