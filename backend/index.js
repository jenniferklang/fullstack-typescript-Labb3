"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
    password: process.env.DB_PASSWORD,
});
client.connect();
app.use((0, cors_1.default)());
const handleInvalidCityId = (response) => {
    response.status(400).send("Ogiltigt city_id");
};
const handleServerError = (response, error) => {
    console.error("Något gick fel: ", error);
    response.status(500).send("Något gick fel vid hämtning av stadsdata");
};
app.get("/api", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT cities.id AS city_id, cities.name AS city_name, food_wholesalers.name AS grossist_name, food_wholesalers.product, food_wholesalers.price
      FROM cities
      LEFT JOIN food_wholesalers ON cities.id = food_wholesalers.city_id;
    `;
        const rows = (yield client.query(query)).rows;
        console.log(rows);
        response.send(rows);
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerError(response, error);
        }
        else {
            handleServerError(response, new Error("Okänt fel"));
        }
    }
}));
app.get("/api/city/:city_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const cityId = parseInt(request.params.city_id, 10);
    if (isNaN(cityId)) {
        handleInvalidCityId(response);
        return;
    }
    try {
        const query = `
      SELECT cities.id AS city_id, cities.name AS city_name, food_wholesalers.name AS grossist_name, food_wholesalers.product, food_wholesalers.price
      FROM cities
      LEFT JOIN food_wholesalers ON cities.id = food_wholesalers.city_id
      WHERE cities.id = $1;
    `;
        const { rows } = yield client.query(query, [
            cityId,
        ]);
        response.send(rows);
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerError(response, error);
        }
        else {
            handleServerError(response, new Error("Okänt fel"));
        }
    }
}));
app.delete("/api/city/:city_id/grossist/:grossist_name", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const cityId = parseInt(request.params.city_id, 10);
    const grossistName = request.params.grossist_name;
    if (isNaN(cityId)) {
        handleInvalidCityId(response);
        return;
    }
    try {
        const query = `
        DELETE FROM food_wholesalers
        WHERE city_id = $1 AND name = $2;
      `;
        yield client.query(query, [cityId, grossistName]);
        response.send("Grossist deleted successfully.");
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerError(response, error);
        }
        else {
            handleServerError(response, new Error("Okänt fel"));
        }
    }
}));
app.post("/api/city/:city_id/grossist", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const cityId = parseInt(request.params.city_id, 10);
    if (isNaN(cityId)) {
        handleInvalidCityId(response);
        return;
    }
    let query;
    if (cityId === 1) {
        query = `
        INSERT INTO food_wholesalers (name, product, price, city_id)
        VALUES ('Centrala partihallen', 'Äpplen', 21.9, $1);
      `;
    }
    else if (cityId === 2) {
        query = `
        INSERT INTO food_wholesalers (name, product, price, city_id)
        VALUES ('Johan i Hallen', 'Nötfärs', 90.99, $1);
      `;
    }
    else {
        response.status(400).send("Ogiltig stad vald");
        return;
    }
    try {
        const { rows } = yield client.query(query, [cityId]);
        response.status(201).json(rows[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerError(response, error);
        }
        else {
            handleServerError(response, new Error("Okänt fel"));
        }
    }
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "public")));
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`);
});
