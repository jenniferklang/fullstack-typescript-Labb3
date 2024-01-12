import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Log {
  entry_id: number;
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
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [intensityValues, setIntensityValues] = useState<{
    [key: string]: number;
  }>({});

  const { entryId } = useParams<{ entryId: string }>();
  const symptomsList: string[] = [
    "Halsbränna",
    "Magsmärta",
    "Uppblåsthet",
    "Sura uppstötningar",
    "Svårigheter att svälja",
    "Bröstsmärta",
    "Heshet",
  ];

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

      const data: Log[] = await response.json();

      const selectedLogItem = data.find(
        (log) => log.entry_id === Number(entryId)
      );
      setSelectedLog(selectedLogItem || null);
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
  }, [entryId]);

  const handleIntensityChange = (
    symptom: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const intensityValue = parseInt(e.target.value, 5) || 0; // Sätt till 0 om värdet är falsy
    setIntensityValues((prevIntensityValues) => ({
      ...prevIntensityValues,
      [symptom]: intensityValue,
    }));
  };

  const handleShowIntensityDropdown = (symptom: string) => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [symptom]: !prevButtonStates[symptom],
    }));
  };
  return (
    <div className="container">
      <h2>Anteckningar</h2>
      {error ? (
        <p>{`Ett fel uppstod: ${error.status} - ${error.message}`}</p>
      ) : (
        <div>
          {selectedLog ? (
            <div>
              <p>
                <strong>Datum:</strong> {selectedLog.date}
              </p>
              <p>
                <strong>Innehåll:</strong> {selectedLog.content}
              </p>
              <p>
                <strong>Symtom:</strong> {selectedLog.symptoms}
              </p>
              <p>
                <strong>Måltid:</strong> {selectedLog.meal}
              </p>
              <div className="symptom-buttons-container">
                {symptomsList.map((symptom) => (
                  <div key={symptom} className="symptom-button-container">
                    <button
                      className={`symptom-button`}
                      data-symptom={symptom}
                      onClick={() => handleShowIntensityDropdown(symptom)}
                    >
                      {symptom}
                    </button>
                    {buttonStates[symptom] && (
                      <select
                        className={`symptom-dropdown`}
                        value={intensityValues[symptom] || 0}
                        onChange={(e) => handleIntensityChange(symptom, e)}
                      >
                        {[0, 1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Ingen logg hittad för det valda id:t.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedLogs;
