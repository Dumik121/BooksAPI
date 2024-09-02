import express from "express";
import * as dotenv from "dotenv";
import { booksRoute } from "./routes/books";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", booksRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
