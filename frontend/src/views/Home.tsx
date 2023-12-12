import { useEffect, useState } from "react";
import "../App.css";
import CityDropDown from "../CityDropdown";
import { GrossistArray } from "../types";

function App() {
  const [data, setData] = useState<GrossistArray>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCity) {
      fetchData(`/api/city/${selectedCity}`);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchData("/api");
  }, []);

  useEffect(() => {
    setDeleteClicked(false);
  }, [selectedCity]);

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const result: GrossistArray = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGrossist = async (cityId: number, grossistName: string) => {
    try {
      const deleteResponse = await fetch(
        `/api/city/${cityId}/grossist/${grossistName}`,
        { method: "DELETE" }
      );

      if (deleteResponse.ok) {
        setDeleteClicked(true);
        fetchData(`/api/city/${cityId}`);
      } else {
        throw new Error("Failed to delete grossist.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddGrossist = async (cityId: number) => {
    try {
      const addResponse = await fetch(`/api/city/${cityId}/grossist`, {
        method: "POST",
      });

      if (addResponse.ok) {
        setDeleteClicked(true);
        fetchData(`/api/city/${cityId}`);
      } else {
        throw new Error(`Failed to add grossist.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (city: string): void => {
    setSelectedCity(city);
  };

  return (
    <>
      <h1>Livsmedelsgrossister</h1>
      <CityDropDown
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
      />

      {selectedCity && (
        <div className="card">
          <div>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((grossist) => (
                <ul key={grossist.city_id}>
                  <p>{grossist.city_name}</p>
                  <p>{grossist.grossist_name}</p>
                  <p>{grossist.product}</p>
                  <p>{grossist.price}</p>
                  <button
                    onClick={() =>
                      handleDeleteGrossist(
                        grossist.city_id,
                        grossist.grossist_name
                      )
                    }
                  >
                    Ta bort
                  </button>

                  {deleteClicked && (
                    <button onClick={() => handleAddGrossist(grossist.city_id)}>
                      Lägg till {selectedCity === "1" ? "Sthlm" : "Gbg"}{" "}
                      Grossist på nytt
                    </button>
                  )}
                </ul>
              ))
            ) : (
              <p>Ingen data tillgänglig än.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
