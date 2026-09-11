import path from "path"
import fs, { writeFileSync } from "fs";
const DB_PATH = path.join(import.meta.dirname, "../data/users.json")
export const readUsers = () => {
      const data = fs.readFileSync(DB_PATH, "utf-8").trim();

  if (data === "") {
    return [];
  }

  return JSON.parse(data);

}

export const writeUsers = (users) => {
 fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

export const findByEmail = (email) => {
    return readUsers().find((u) => u.email === email) || null
}

export const findById = (id) => {
    return readUsers().find((u) => u.id === id) || null
}