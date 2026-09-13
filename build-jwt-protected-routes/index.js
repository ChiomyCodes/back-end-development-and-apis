import express from "express";
import helmet from "helmet";
import router from "./routes/auth.js";
import adminRouter from "./routes/admin.js";


const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/auth", router)
app.use("/api/admin",adminRouter )

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});
app.use((err, req, res, next) => { 
  const status = err.status || 500;
   res.status(status).json({ error: err.message, }); 
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
