import express, { Request, Response } from "express";
import { WholesalersArray } from "./types";
import path from "path";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;

import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
  password: process.env.DB_PASSWORD,
});

client.connect();
app.use(cors());

const handleInvalidCityId = (response: Response) => {
  response.status(400).send("Ogiltigt city_id");
};

const handleServerError = (response: Response, error: Error) => {
  console.error("Något gick fel: ", error);
  response.status(500).send("Något gick fel vid hämtning av stadsdata");
};

app.get("/api", async (_request: Request, response: Response) => {
  try {
    const query = `
      SELECT cities.id AS city_id, cities.name AS city_name, food_wholesalers.name AS grossist_name, food_wholesalers.product, food_wholesalers.price
      FROM cities
      LEFT JOIN food_wholesalers ON cities.id = food_wholesalers.city_id;
    `;

    const rows: WholesalersArray = (await client.query(query)).rows;
    console.log(rows);
    response.send(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerError(response, error);
    } else {
      handleServerError(response, new Error("Okänt fel"));
    }
  }
});

app.get("/api/city/:city_id", async (request: Request, response: Response) => {
  const cityId: number = parseInt(request.params.city_id, 10);

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

    const { rows }: { rows: WholesalersArray } = await client.query(query, [
      cityId,
    ]);

    response.send(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerError(response, error);
    } else {
      handleServerError(response, new Error("Okänt fel"));
    }
  }
});

app.delete(
  "/api/city/:city_id/grossist/:grossist_name",
  async (request: Request, response: Response) => {
    const cityId: number = parseInt(request.params.city_id, 10);
    const grossistName: string = request.params.grossist_name;

    if (isNaN(cityId)) {
      handleInvalidCityId(response);
      return;
    }

    try {
      const query = `
        DELETE FROM food_wholesalers
        WHERE city_id = $1 AND name = $2;
      `;

      await client.query(query, [cityId, grossistName]);
      response.send("Grossist deleted successfully.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleServerError(response, error);
      } else {
        handleServerError(response, new Error("Okänt fel"));
      }
    }
  }
);

app.post(
  "/api/city/:city_id/grossist",
  async (request: Request, response: Response) => {
    const cityId: number = parseInt(request.params.city_id, 10);

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
    } else if (cityId === 2) {
      query = `
        INSERT INTO food_wholesalers (name, product, price, city_id)
        VALUES ('Johan i Hallen', 'Nötfärs', 90.99, $1);
      `;
    } else {
      response.status(400).send("Ogiltig stad vald");
      return;
    }

    try {
      const { rows } = await client.query(query, [cityId]);
      response.status(201).json(rows[0]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleServerError(response, error);
      } else {
        handleServerError(response, new Error("Okänt fel"));
      }
    }
  }
);

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
