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
require("@cypress/code-coverage/middleware/express")(app);
const port = process.env.PORT || 3002;
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
    password: process.env.DB_PASSWORD,
});
client.connect();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "public")));
app.use(express_1.default.json());
app.get("/api", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.get("/api/dates-with-entries", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/api/add-entry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, content, symptoms, meal } = req.body;
    const userId = 1;
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
        const entryId = parseInt(entryIdString, 10);
        if (isNaN(entryId)) {
            return res.status(400).json({ error: "Invalid entryId" });
        }
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
app.put("/api/update-entry/:entryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entryId = parseInt(req.params.entryId, 10);
        const { date, content, symptoms, meal } = req.body;
        if (isNaN(entryId)) {
            return res.status(400).json({ error: "Invalid entryId" });
        }
        console.log("Updating entry with ID:", entryId);
        console.log("New data:", { date, content, symptoms, meal });
        const updatedEntry = yield client.query(`
      UPDATE entries
      SET content = $1, symptoms = $2, meal = $3
      WHERE entry_id = $4
      RETURNING *;
      `, [content, symptoms, meal, entryId]);
        if (updatedEntry.rows.length === 1) {
            console.log("Entry updated successfully");
            res.json({
                success: true,
                message: "Entry updated successfully",
                updatedEntry: updatedEntry.rows[0],
            });
        }
        else {
            console.error("Failed to update entry");
            res.status(500).json({ error: "Failed to update entry" });
        }
    }
    catch (error) {
        console.error("Error updating entry", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get("/api/symptoms", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
      SELECT *
      FROM symptoms;
      `);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/api/add-symptoms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entry_id, symptoms } = req.body;
        yield client.query(`
      INSERT INTO symptoms (entry_id, symptom)
      VALUES ${symptoms
            .map((symptom) => `(${entry_id}, '${symptom}')`)
            .join(", ")};
      `);
        res.json({ success: true });
    }
    catch (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`);
    console.log(`Connected to PostgreSQL database`);
});
