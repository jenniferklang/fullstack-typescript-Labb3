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

app.get("/api", async (req: Request, res: Response) => {
  try {
    const result = await client.query(`
      SELECT users.username, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
