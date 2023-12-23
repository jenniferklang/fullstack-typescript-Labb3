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
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
const client = new pg_1.Client({
    connectionString: process.env.PGURI_NEW,
    password: process.env.DB_PASSWORD,
});
client.connect();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "public")));
app.use(express_1.default.json()); // Lägg till för att hantera JSON i request body
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
        SELECT entries.entry_id, users.username, entries.entry_date, entries.content, entries.symptoms, entries.meal
        FROM entries
        JOIN users ON entries.user_id = users.user_id;
      `);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get("/api/dates-with-entries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
      SELECT DISTINCT entries.entry_date
      FROM entries;
      `);
        const datesWithEntries = result.rows.map((entry) => entry.entry_date);
        res.json(datesWithEntries);
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get("/api/logs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const result = yield client.query(`
      SELECT users.user_id, users.username, entries.entry_id, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id
      WHERE entries.entry_date::date = $1;
      `, [date]);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Lägg till en ny loggpost
app.post("/api/add-entry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, content, symptoms, meal } = req.body;
    const userId = 1; // Ersätt detta med den verkliga användarinformationen från autentisering
    console.log("Received data:", { date, content, symptoms, meal });
    try {
        yield client.query(`
        INSERT INTO entries (user_id, entry_date, content, symptoms, meal)
        VALUES ($1, $2, $3, $4, $5);
      `, [userId, date, content, symptoms, meal]);
        res.status(201).json({ message: "Loggposten har lagts till" });
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.delete("/api/delete-entry/:entryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entryIdString = req.params.entryId;
        // Konvertera entryId till ett heltal
        const entryId = parseInt(entryIdString, 10);
        // Kontrollera om entryId är ett numeriskt värde
        if (isNaN(entryId)) {
            return res.status(400).json({ error: "Invalid entryId" });
        }
        // Radera posten från databasen baserat på entryId
        yield client.query(`
        DELETE FROM entries
        WHERE entry_id = $1;
      `, [entryId]);
        res.json({ success: true, message: "Entry deleted successfully" });
    }
    catch (error) {
        console.error("Error executing DELETE query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`);
});
