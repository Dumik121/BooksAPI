import * as fs from "fs/promises";
import * as path from "path";
import { BookInterface, DatabaseInterface } from "../types/types";

const dbPath = path.resolve(__dirname, "../../db/db.json");

export async function readDb(): Promise<DatabaseInterface> {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data) as DatabaseInterface;
}

export async function writeDb(data: DatabaseInterface): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function readBooks(): Promise<BookInterface[]> {
  const data = await readDb();
  return data.books;
}

export async function writeBooks(books: BookInterface[]): Promise<void> {
  const data = await readDb();
  await writeDb({ ...data, books });
}
