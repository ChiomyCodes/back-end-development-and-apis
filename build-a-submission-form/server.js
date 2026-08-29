import express from "express"
import apiRouter from "./routes/api.routes.js";
import { finalErrorHandler, notFoundHandler } from "./middleware/error.middleware.js";
const app = express();
const port = 3000;
app.use((req, res , next) => {
    console.log(req.method, req.url)
    next();
    
})
app.use("/api", apiRouter)
app.use(notFoundHandler);
app.use(finalErrorHandler)

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.listen(3000, () => console.log(`server is running on port ${port}`))