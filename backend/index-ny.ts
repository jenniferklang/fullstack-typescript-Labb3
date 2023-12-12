import express from "express";

import path from "path";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3002;

import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI_NEW, // Använd den nya anslutningssträngen här
  password: process.env.DB_PASSWORD,
});

client.connect();
app.use(cors());

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
