// LogEntry.tsx

import React from "react";
import { Log } from "./Log";
import "../App.css";

interface LogEntryProps {
  log: Log;
  onSelect: (entry_id: number) => void;
  onDelete: (entry_id: number) => void;
  isSelected: boolean;
}

const LogEntry: React.FC<LogEntryProps> = ({
  log,
  onSelect,
  onDelete,
  isSelected,
}) => {
  const handleClick = () => {
    onSelect(log.entry_id);
  };

  const handleDelete = () => {
    onDelete(log.entry_id);
  };

  return (
    <div className={`log-entry ${isSelected ? "selected" : ""}`}>
      <p onClick={handleClick}>Innehåll: {log.content}</p>
      {isSelected && <button onClick={handleDelete}>Ta bort</button>}
    </div>
  );
};

export default LogEntry;
