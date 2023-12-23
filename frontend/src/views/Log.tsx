// Log.tsx

import React, { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";
import LogEntry from "./LogEntry";

export interface Log {
  id: number;
  entry_id: number;
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    return date;
  }
  return format(date, "yyyy-MM-dd");
};

const LogComponent: React.FC = () => {
  const [logData, setLogData] = useState<Log>({
    id: 0,
    entry_id: 0,
    date: formatDate(new Date()),
    content: "",
    symptoms: "",
    meal: "",
  });

  const [logs, setLogs] = useState<Log[]>([]);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedLogId, setSelectedLogId] = useState<Log | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogData({
      ...logData,
      [e.target.id]: e.target.value,
    });
  };

  const resetForm = () => {
    setLogData({
      id: 0,
      entry_id: 0,
      date: formatDate(new Date()),
      content: "",
      symptoms: "",
      meal: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedDate = formatDate(logData.date);

      const response = await fetch("/api/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...logData,
          date: formattedDate,
        }),
      });

      if (response.ok) {
        console.log("Log entry added successfully");

        fetchLogs();

        resetForm();
      } else {
        console.error("Failed to add log entry");
      }
    } catch (error) {
      console.error("Error adding log entry", error);
    }
  };

  const fetchLogs = async () => {
    try {
      let apiUrl = "/api/logs";
      if (selectedDate) {
        const formattedDate = formatDate(selectedDate);
        apiUrl += `?date=${formattedDate}`;
      }

      const response = await fetch(apiUrl);
      const data: Log[] = await response.json();

      console.log("Data from server:", data);

      const logDates = data
        .filter((log) => log.date)
        .map((log) => new Date(log.date));

      console.log("Dates:", logDates);

      setLogs(data);
      setMarkedDates(logDates);
    } catch (error) {
      console.error("Error fetching logs", error);
    }
  };

  const fetchMarkedDates = async () => {
    try {
      const response = await fetch("/api/dates-with-entries");
      const data: string[] = await response.json();
      console.log("Marked Dates from server:", data);
      const entryDates = data.map((entryDate) => new Date(entryDate));
      setMarkedDates(entryDates);
    } catch (error) {
      console.error("Error fetching marked dates", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLogs();
      await fetchMarkedDates();
    };

    fetchData();
  }, [selectedDate]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      return markedDates.find((markedDate) => isSameDay(markedDate, date)) ? (
        <div className="calendar-dot" />
      ) : null;
    }
    return null;
  };

  const onClickDay = (value: Date, _event: React.SyntheticEvent<any>) => {
    setSelectedDate(value);
  };

  const onSelectLog = (entryId: number) => {
    const selectedLogItem = logs.find((log) => log.entry_id === entryId);
    setSelectedLogId(selectedLogItem || null);
  };

  return (
    <div className="log-container">
      <div className="calendar-form-container">
        <h2>Dagens Log</h2>
        <Calendar
          tileContent={tileContent}
          calendarType="gregory"
          locale="sv-SE"
          showNeighboringMonth={false}
          value={selectedDate || new Date()}
          onClickDay={onClickDay}
        />

        {selectedDate && (
          <form id="form-for-anteckning" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Hur mår du?
              </label>
              <input
                type="text"
                className="form-control"
                id="content"
                value={logData.content}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="symptoms" className="form-label">
                Symtom?
              </label>
              <input
                type="text"
                className="form-control"
                id="symptoms"
                value={logData.symptoms}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="meal" className="form-label">
                Vad har du ätit?
              </label>
              <input
                type="text"
                className="form-control"
                id="meal"
                value={logData.meal}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Entry
            </button>
          </form>
        )}
      </div>
      <div className="log-list-container">
        {selectedDate && (
          <div>
            {logs.map((log) => {
              console.log("Log entry_Id:", log.entry_id);
              return (
                <LogEntry
                  key={log.entry_id}
                  log={log}
                  onSelect={onSelectLog}
                  isSelected={
                    log.entry_id === (selectedLogId?.entry_id || null)
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogComponent;
