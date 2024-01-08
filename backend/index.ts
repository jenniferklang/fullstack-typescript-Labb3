import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

const client = new Client({
  connectionString: process.env.PGURI_NEW,
  password: process.env.DB_PASSWORD,
});

client.connect();

app.use(cors());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());

interface Entry {
  date: string;
  content: string;
  symptoms: string;
  meal: string;
}

app.get("/api", async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      `
        SELECT entries.entry_id, users.username, entries.entry_date, entries.content, entries.symptoms, entries.meal
        FROM entries
        JOIN users ON entries.user_id = users.user_id;
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/dates-with-entries", async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      `
      SELECT DISTINCT entries.entry_date
      FROM entries;
      `
    );

    const datesWithEntries = result.rows.map((entry) => entry.entry_date);
    res.json(datesWithEntries);
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/logs", async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const result = await client.query(
      `
      SELECT users.user_id, users.username, entries.entry_id, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id
      WHERE entries.entry_date::date = $1;
      `,
      [date]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lägg till en ny loggpost
app.post(
  "/api/add-entry",
  async (req: Request<{}, {}, Entry>, res: Response) => {
    const { date, content, symptoms, meal } = req.body;
    const userId = 1; // Ersätt detta med den verkliga användarinformationen från autentisering

    console.log("Received data:", { date, content, symptoms, meal });

    try {
      await client.query(
        `
        INSERT INTO entries (user_id, entry_date, content, symptoms, meal)
        VALUES ($1, $2, $3, $4, $5);
      `,
        [userId, date, content, symptoms, meal]
      );

      res.status(201).json({ message: "Loggposten har lagts till" });
    } catch (error) {
      console.error("Error executing SQL query", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.delete("/api/delete-entry/:entryId", async (req, res) => {
  try {
    const entryIdString = req.params.entryId;

    const entryId = parseInt(entryIdString, 10);

    if (isNaN(entryId)) {
      return res.status(400).json({ error: "Invalid entryId" });
    }

    await client.query(
      `
        DELETE FROM entries
        WHERE entry_id = $1;
      `,
      [entryId]
    );

    res.json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error executing DELETE query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/update-entry/:entryId", async (req, res) => {
  try {
    const entryId = parseInt(req.params.entryId, 10);
    const { date, content, symptoms, meal } = req.body;

    if (isNaN(entryId)) {
      return res.status(400).json({ error: "Invalid entryId" });
    }

    console.log("Updating entry with ID:", entryId);
    console.log("New data:", { date, content, symptoms, meal });

    const updatedEntry = await client.query(
      `
      UPDATE entries
      SET content = $1, symptoms = $2, meal = $3
      WHERE entry_id = $4
      RETURNING *;
      `,
      [content, symptoms, meal, entryId]
    );

    if (updatedEntry.rows.length === 1) {
      console.log("Entry updated successfully");
      res.json({
        success: true,
        message: "Entry updated successfully",
        updatedEntry: updatedEntry.rows[0],
      });
    } else {
      console.error("Failed to update entry");
      res.status(500).json({ error: "Failed to update entry" });
    }
  } catch (error) {
    console.error("Error updating entry", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
