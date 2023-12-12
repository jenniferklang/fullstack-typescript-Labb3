import React, { ChangeEvent } from "react";
import { DropdownProps } from "./types";

const Dropdown: React.FC<DropdownProps> = ({ selectedCity, onCityChange }) => {
  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        value={selectedCity}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onCityChange(e.target.value)
        }
      >
        <option value="">Välj en stad</option>
        <option value="1">Stockholm</option>
        <option value="2">Göteborg</option>
      </select>
    </div>
  );
};

export default Dropdown;
