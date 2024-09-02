import express, { Request, Response } from "express";
import { readBooks, writeBooks } from "../database/database";
import { BookInterface } from "../types/types";

const booksRoute = express.Router();

booksRoute.get("/", async (req: Request, res: Response) => {
  try {
    const books = await readBooks();
    res.json(books);
  } catch (error) {
    console.error("Error reading database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

booksRoute.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const books = await readBooks();
    const book = books.find((b: any) => b._id === parseInt(req.params.bookId));
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error reading database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

booksRoute.post("/", async (req: Request, res: Response) => {
  try {
    const newBook: BookInterface = req.body;
    const books = await readBooks();

    newBook._id = books.length > 0 ? books[books.length - 1]._id + 1 : 1;

    books.push(newBook);
    await writeBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error writing to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

booksRoute.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const books = await readBooks();
    const index = books.findIndex(
      (b: any) => b._id === parseInt(req.params.bookId)
    );

    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    books[index] = { ...books[index], ...req.body };
    await writeBooks(books);

    res.json(books[index]);
  } catch (error) {
    console.error("Error writing to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

booksRoute.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const books = await readBooks();
    const index = books.findIndex(
      (b: any) => b._id === parseInt(req.params.bookId)
    );

    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    await writeBooks(books);

    res.status(204);
    res.end()
  } catch (error) {
    console.error("Error writing to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { booksRoute };
