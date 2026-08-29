import express from "express"
import { Router } from "express";
const apiRouter = express.Router();
apiRouter.get("/",(req,res) => {
    res.status(200).send("API is available!")
})
apiRouter.get("/crash", (req, res, next) => {
    const error = new Error("Database connection failed.")
    next(error);
})
apiRouter.get("/bad-request", (req, res, next) => {
    const err = new Error("Client-side data is missing.")
    err.status = 400;
    next(err);
})

export default apiRouter;