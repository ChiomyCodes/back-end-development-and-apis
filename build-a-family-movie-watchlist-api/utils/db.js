import fs from "fs";
import path from "path";
import users from "../data/users.json" with { type: "json" };

const WATCHLISTS_PATH = path.join(
  import.meta.dirname,
  "../data/watchlists.json",
);

export function readWatchlists() {
  return JSON.parse(fs.readFileSync(WATCHLISTS_PATH, "utf-8"));
}

export function writeWatchlists(watchlists) {
  fs.writeFileSync(WATCHLISTS_PATH, JSON.stringify(watchlists, null, 2));
}

export function findByUsername(username) {
  return users.find((u) => u.username === username) || null;
}

export function findById(id) {
  return users.find((u) => String(u.id) === String(id)) || null;
}

export function getWatchlist(userId) {
  if (!findById(userId)) {
    return null;
  }

  const watchlists = readWatchlists();

  return watchlists[userId] || [];
}
export function addMovie(userId, movieData) {
  const user = findById(userId);

  if (!user) {
    return null;
  }

  const watchlists = readWatchlists();
  const list = watchlists[String(user.id)] || [];

  const newId =
    list.length > 0
      ? Math.max(...list.map((movie) => Number(movie.id))) + 1
      : 1;

  const movie = {
    id: newId,
    title: movieData.title,
    genre: movieData.genre,
    watched: false,
  };

  list.push(movie);
  watchlists[String(user.id)] = list;

  writeWatchlists(watchlists);

  return movie;
}

export function deleteMovie(userId, movieId) {
  const user = findById(userId);

  if (!user) {
    return null;
  }

  const watchlists = readWatchlists();
  const key = String(user.id);
  const list = watchlists[key] || [];

  const index = list.findIndex(
    (movie) => Number(movie.id) === Number(movieId),
  );

  if (index === -1) {
    return null;
  }

  list.splice(index, 1);
  watchlists[key] = list;

  writeWatchlists(watchlists);

  return true;
}




export function updateMovie(userId, movieId, updates) {
  if (!findById(userId)) {
    return null;
  }

  const watchlists = readWatchlists();
  const list = watchlists[userId] || [];
  const index = list.findIndex((m) => m.id === movieId);

  if (index === -1) {
    return null;
  }

  list[index] = { ...list[index], ...updates, id: movieId };
  watchlists[userId] = list;
  writeWatchlists(watchlists);

  return list[index];
}


