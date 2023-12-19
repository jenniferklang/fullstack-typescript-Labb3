import React, { useState, useEffect } from "react";

interface Log {
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

interface ApiError {
  status: number;
  message: string;
}

const SavedLogs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:3002/api");
      if (!response.ok) {
        const errorData: ApiError = {
          status: response.status,
          message: `Misslyckades med att hämta loggar. Status: ${response.status}`,
        };
        throw errorData;
      }

      const data = await response.json();
      setLogs(data);
    } catch (errorData: unknown) {
      if (errorData instanceof Error) {
        console.error("Fel vid hämtning av loggar:", errorData.message);
        setError({
          status: -1,
          message: `Ett fel uppstod: ${errorData.message}`,
        });
      }
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container">
      <h2>Saved Logs</h2>
      {error ? (
        <p>{`Ett fel uppstod: ${error.status} - ${error.message}`}</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              <strong>Date:</strong> {log.date}, <strong>Content:</strong>{" "}
              {log.content}, <strong>Symptoms:</strong> {log.symptoms},{" "}
              <strong>Meal:</strong> {log.meal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedLogs;
