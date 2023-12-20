import Log from "./Log";
import "../App.css";

interface LogEntryProps {
  log: Log;
}

const LogEntry: React.FC<LogEntryProps> = ({ log }) => {
  return (
    <div className="log-entry-container">
      <p>Date: {log.date}</p>
      <p>Content: {log.content}</p>
      <p>Symptoms: {log.symptoms}</p>
      <p>Meal: {log.meal}</p>
    </div>
  );
};

export default LogEntry;
