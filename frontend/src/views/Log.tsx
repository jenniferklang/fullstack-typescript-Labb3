import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { format, isSameDay } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";
import LogEntry from "./LogEntry";

interface Log {
  id: number;
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

const Log: React.FC = () => {
  const [logData, setLogData] = useState<Log>({
    id: 0,
    date: formatDate(new Date()),
    content: "",
    symptoms: "",
    meal: "",
  });

  const [logs, setLogs] = useState<Log[]>([]);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  function formatDate(date: Date | string): string {
    if (typeof date === "string") {
      return date;
    }
    return format(date, "yyyy-MM-dd");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogData({
      ...logData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
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
        // Uppdatera loggar efter att en ny post har lagts till
        fetchLogs();
      } else {
        console.error("Failed to add log entry");
      }
    } catch (error) {
      console.error("Error adding log entry", error);
    }
  };

  const fetchLogs = async () => {
    try {
      let apiUrl = "/api/logs"; // Uppdaterat API-endpoint för att hämta loggar
      if (selectedDate) {
        const formattedDate = formatDate(selectedDate);
        apiUrl += `?date=${formattedDate}`;
      }

      const response = await fetch(apiUrl);
      const data: Log[] = await response.json();
      const logDates = data.map((log) => new Date(log.date));
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
            {logs.map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Log;
