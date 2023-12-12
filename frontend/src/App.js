"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
require("./App.css");
function App() {
    const [data, setData] = (0, react_2.useState)([]);
    const [selectedCity, setSelectedCity] = (0, react_2.useState)("");
    const [deleteClicked, setDeleteClicked] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        if (selectedCity) {
            fetch(`/api/city/${selectedCity}`)
                .then((response) => response.json())
                .then((result) => {
                setData(result);
            });
        }
    }, [selectedCity]);
    (0, react_2.useEffect)(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((result) => {
            setData(result);
        });
    }, []);
    (0, react_2.useEffect)(() => {
        setDeleteClicked(false);
    }, [selectedCity]);
    const handleDeleteGrossist = (selectedCity, grossistName) => {
        fetch(`/api/city/${selectedCity}/grossist/${grossistName}`, {
            method: "DELETE",
        })
            .then((response) => {
            if (response.ok) {
                setDeleteClicked(true);
                return fetch(`/api/city/${selectedCity}`);
            }
            else {
                throw new Error("Failed to delete grossist.");
            }
        })
            .then((response) => response.json())
            .then((result) => {
            setData(result);
        })
            .catch((error) => {
            console.error(error);
        });
    };
    // Inte kollat här nere..... och du måste fixa error....
    const handleAddStockholmGrossist = () => {
        console.log("Återställ Sthlm-knapp klickades.");
        fetch(`/api/city/1/grossist`, {
            method: "POST",
        })
            .then((response) => {
            if (response.ok) {
                return fetch(`/api/city/1`);
            }
            else {
                throw new Error("Failed to add Stockholm grossist.");
            }
        })
            .then((response) => response.json())
            .then((result) => {
            setData(result);
        })
            .catch((error) => {
            console.error(error);
        });
    };
    const handleAddGoteborgGrossist = () => {
        console.log("Återställ Gbg-knapp klickades.");
        fetch(`/api/city/2/grossist`, {
            method: "POST",
        })
            .then((response) => {
            if (response.ok) {
                return fetch(`/api/city/2`);
            }
            else {
                throw new Error("Failed to add Göteborg grossist.");
            }
        })
            .then((response) => response.json())
            .then((result) => {
            setData(result);
        })
            .catch((error) => {
            console.error(error);
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Livsmedelsgrossister"),
        react_1.default.createElement("div", { className: "dropdown-container" },
            react_1.default.createElement("select", { className: "dropdown", value: selectedCity, onChange: (e) => setSelectedCity(e.target.value) },
                react_1.default.createElement("option", { value: "" }, "V\u00E4lj en stad"),
                react_1.default.createElement("option", { value: "1" }, "Stockholm"),
                react_1.default.createElement("option", { value: "2" }, "G\u00F6teborg"))),
        selectedCity && (react_1.default.createElement("div", { className: "card" },
            react_1.default.createElement("div", null, Array.isArray(data) && data.length > 0 ? (data.map((grossist) => (react_1.default.createElement("ul", { key: grossist.city_id },
                react_1.default.createElement("p", null, grossist.city_name),
                react_1.default.createElement("p", null, grossist.grossist_name),
                react_1.default.createElement("p", null, grossist.product),
                react_1.default.createElement("p", null, grossist.price),
                react_1.default.createElement("button", { onClick: () => {
                        handleDeleteGrossist(grossist.city_id, grossist.grossist_name);
                    } }, "Ta bort"),
                deleteClicked && selectedCity === "1" ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { onClick: handleAddStockholmGrossist }, "L\u00E4gg till Sthlm Grossist p\u00E5 nytt"))) : null,
                deleteClicked && selectedCity === "2" ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { onClick: handleAddGoteborgGrossist }, "L\u00E4gg till Gbg Grossist p\u00E5 nytt"))) : null)))) : (react_1.default.createElement("p", null, "Ingen data tillg\u00E4nglig \u00E4n.")))))));
}
exports.default = App;
//# sourceMappingURL=App.js.map