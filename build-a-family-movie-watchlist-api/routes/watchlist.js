
import express from "express";

import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const watchlistRoutes = express.Router();

watchlistRoutes.get("/:userId", authenticate, (req, res) => {
  const { userId } = req.params;

  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  return res.status(200).json(watchlist);
});


// Parent can modify any user's watchlist.
// Child can modify only their own watchlist.
watchlistRoutes.post(
  "/:userId/movies",
  authenticate,
  authorizeModification,
  (req, res) => {
    const { userId } = req.params;

    const movie = addMovie(userId, req.body);

    if (movie === null) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(201).json(movie);
  },
);

// Parent can modify any user's movie.
// Child can modify only their own movie.
watchlistRoutes.put(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const { userId, movieId } = req.params;

    const movie = updateMovie(
      userId,
      Number(movieId),
      req.body,
    );

    if (movie === null) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    return res.status(200).json(movie);
  },
);


watchlistRoutes.delete(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const { userId, movieId } = req.params;

    const deleted = deleteMovie(
      userId,
      Number(movieId),
    );

    if (deleted === null) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    return res.status(200).json({
      message: "Movie deleted successfully.",
    });
  },
);

export default watchlistRoutes;
