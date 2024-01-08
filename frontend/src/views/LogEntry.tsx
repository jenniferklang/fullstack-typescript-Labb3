// LogEntry.tsx

import React from "react";
import { Log } from "./Log";
import "../App.css";

interface LogEntryProps {
  log: Log;
  onSelect: (entry_id: number) => void;
  onDelete: (entry_id: number) => void;
  onEdit: (entry_id: number) => void;
  isSelected: boolean;
}

const LogEntry: React.FC<LogEntryProps> = ({
  log,
  onSelect,
  onDelete,
  onEdit,
  isSelected,
}) => {
  const handleClick = () => {
    onSelect(log.entry_id);
  };

  const handleDelete = () => {
    onDelete(log.entry_id);
  };

  const handleEdit = () => {
    onEdit(log.entry_id);
  };

  return (
    <div className={`log-entry ${isSelected ? "selected" : ""}`}>
      <div onClick={handleClick}>
        Innehåll:
        <p>{log.content}</p>
        <p>{log.symptoms}</p>
        <p>{log.meal}</p>
      </div>

      {isSelected && (
        <div>
          <button onClick={handleDelete}>Ta bort</button>
          <button onClick={handleEdit}>Ändra</button>
        </div>
      )}
    </div>
  );
};

export default LogEntry;
