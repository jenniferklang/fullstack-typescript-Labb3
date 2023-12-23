// LogEntry.tsx

import React from "react";
import { Log } from "./Log";
import "../App.css";

interface LogEntryProps {
  log: Log;
  onSelect: (logId: number) => void; // Funktion för att hantera klick
  isSelected: boolean; // Indikation om posten är markerad
}

const LogEntry: React.FC<LogEntryProps> = ({ log, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(log.id);
  };

  return (
    <div
      className={`log-entry ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <p>Datum: {log.date}</p>
      <p>Innehåll: {log.content}</p>
      <p>Symptom: {log.symptoms}</p>
      <p>Måltid: {log.meal}</p>
    </div>
  );
};

export default LogEntry;
