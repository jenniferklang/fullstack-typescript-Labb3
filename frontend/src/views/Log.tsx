import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../App.css";

interface Log {
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

const Log: React.FC = () => {
  const [logData, setLogData] = useState({
    date: "",
    content: "",
    symptoms: "",
    meal: "",
  });

  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const [formSubmittedDates, setFormSubmittedDates] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogData({
      ...logData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", logData);

    try {
      const response = await fetch("/api/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        console.log("Log entry added successfully");
        setFormSubmittedDates((prevDates) => [...prevDates, logData.date]);
      } else {
        console.error("Failed to add log entry");
      }
    } catch (error) {
      console.error("Error adding log entry", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api");
      const data: Log[] = await response.json();
      const logDates = data.map((log) => log.date);
      setMarkedDates(logDates);
    } catch (error) {
      console.error("Error fetching logs", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container">
      <h2>Log-sidan</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`mb-3 ${
            logData.date &&
            (markedDates.includes(logData.date) ||
              formSubmittedDates.includes(logData.date))
              ? "marked"
              : ""
          }`}
        >
          <label htmlFor="date" className="form-label">
            Datum
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={logData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Innehåll:
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
            Symptom:
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
            Måltid:
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
          Spara post
        </button>
      </form>
    </div>
  );
};

export default Log;
