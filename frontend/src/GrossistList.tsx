import React from "react";
import { Grossist, GrossistListProps } from "./types";

const GrossistList: React.FC<GrossistListProps> = ({
  data,
  onDelete,
  onAdd,
  deleteClicked,
  selectedCity,
}) => {
  return (
    <div className="card">
      <div>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((grossist: Grossist) => (
            <ul key={grossist.city_id}>
              <p>{grossist.city_name}</p>
              <p>{grossist.grossist_name}</p>
              <p>{grossist.product}</p>
              <p>{grossist.price}</p>
              <button
                onClick={() =>
                  onDelete(grossist.city_id, grossist.grossist_name)
                }
              >
                Ta bort
              </button>

              {deleteClicked && (
                <button onClick={() => onAdd(grossist.city_id)}>
                  Lägg till {selectedCity === "1" ? "Sthlm" : "Gbg"} Grossist på
                  nytt
                </button>
              )}
            </ul>
          ))
        ) : (
          <p>Ingen data tillgänglig än.</p>
        )}
      </div>
    </div>
  );
};

export default GrossistList;
