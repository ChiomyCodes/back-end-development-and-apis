// Starter file — add your code here
const fs = require("fs");
console.log(fs)

// const data = fs.readFile("assets/poem.txt", {encoding: "utf8"}, (err,data) => {console.log(data)}); 
const fsPromises = require("fs/promises")
async function main(){
    const data2 = await fsPromises.readFile("assets/poem.txt", {encoding:"utf8"}, (err, data2) => {console.log(data2)})
    console.log(data2)
}

main();

const data3 = fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
fs.appendFileSync("assets/output.txt", "\nThis is getting intresting!");
const data4 = fs.existsSync("assets/output.txt");
console.log(data4)
const entries = fs.readdirSync("assets");
console.log(entries);

const buf = Buffer.from("Hello, Node!");
console.log(buf);
console.log(buf.toString("hex"));
console.log(buf.toString("base64"));
const buf2 = Buffer.alloc(8, 0xff);
console.log(buf2)

const decoded = Buffer.from("ZnJlZUNvZGVDYW1w","base64").toString("utf8");
console.log(decoded)

const crypto = require("crypto");
const hash = crypto.createHash("sha256", "freeCodeCamp!").digest("hex");
console.log(hash)

const random = crypto.randomBytes(16).toString("hex")
console.log(random)

const id = crypto.randomUUID();
console.log(id)

const os = require ("os");
os.platform();
os.arch();
os.hostname();
os.totalmem();
os.freemem();
os.uptime();

console.log(os.totalmem("hex"), os.freemem("hex"), os.uptime )
console.log(os.totalmem("hex"))
console.log(os.freemem("hex"))
console.log(os.uptime("hex"))
console.log(os.cpus().length);

const path = require("path");
const { Readable } = require("stream");
const filePath = path.join(__dirname, "assets", "poem.txt")
console.log(filePath);
path.basename(filePath),
path.dirname(filePath)
path.extname(filePath)
console.log(path.basename, path.dirname, path.extname)

console.log(path.join("assets", "..", "server.js"));

console.log(path.resolve("assets", "..", "server.js"));
console.log(path.parse(filePath));
// process
console.log(process.version)
console.log(process.platform);
console.log(process.env.NODE_ENV);
console.log(process.argv);
console.log(process.argv[0]);

process.stdout.write("Hello from stdout\n")
process.stderr.write("Hello from stderr\n")

// stream
// const readable = fs.createReadStream("assets/poem.txt", {encoding: "utf8"});
// readable.on("data", (chunk)=> {console.log(chunk)});
// readable.on("end", ()=> {console.log("This is the end")});

const writeable = fs.createWriteStream("assets/stream-output.txt", {encoding: "utf8"});

writeable.write("This is first chunk\n")
writeable.write("This is second chunk\n")
writeable.end();
const readable = fs.createReadStream("assets/poem.txt")
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable)