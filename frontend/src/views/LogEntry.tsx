import React from "react";
import { Link } from "react-router-dom";
import { LogEntryProps } from "../types";
import "../App.css";

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
          <Link to={`/log/details/${log.entry_id}`}>
            <button>Se mer...</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LogEntry;
