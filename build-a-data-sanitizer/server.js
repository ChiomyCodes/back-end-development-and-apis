import express from "express";
import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.post(
  "/submit",
  inputCleaner,
  inputValidator,
  (req, res) => {
    res.send(`
      <h1>Submission Received</h1>
      <p>Username: ${req.body.username}</p>
      <p>Comment: ${req.body.comment}</p>
    `);
  }
);



app.listen(3000, () => console.log(`Server is running on port ${port}`))