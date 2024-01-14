export interface Log {
  id: number;
  entry_id: number;
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

export interface LogEntryProps {
  log: Log;
  onSelect: (entry_id: number) => void;
  onDelete: (entry_id: number) => void;
  onEdit: (entry_id: number) => void;
  isSelected: boolean;
}
