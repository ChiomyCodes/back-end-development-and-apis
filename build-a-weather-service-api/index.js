import express, { json, urlencoded } from "express";
import router from "./weather.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express()
const port = 3000
app.use(express.urlencoded({extended: true}))
app.use("/api/weather", router)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));



app.get("/",(req, res) => {
    res.status(200).send("Welcome to weather service ");
    res.sendFile("public/index.html")
})
app.get("/docs", (req, res) => {
    res.redirect("/api/info");
    res.json({name: "This is a weather service API"})
})
app.get("/api/info",(req, res) => {
res.json({name: "This is a weather service API", endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]})
})
app.get("/api/status", (req, res) => {
    const status = 200;
    
    res.json({status})
})
app.get("/api/greet/:name", (req, res)=> {
    const name = req.params.name;
    res.json(name)
})
app.get("/api/weather/London",async (req, res) => {
        const response = await  fetch(`https://weather-proxy.freecodecamp.rocks/api/city/London`)

      const data = await response.json();

     res.json({city: data.name, temperature: data.main.temp, description: data.weather[0].description})

})

app.route("/api/data").get( (req, res) => {
    const status = 200;
    res.json({status})
}).post((req, res) => {
    const status = 201;
    res.status(status).json({status})
})

app.listen(3000, () => console.log(`Server is running on port ${port}`))