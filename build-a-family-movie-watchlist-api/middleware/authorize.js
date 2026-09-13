


export function authorizeModification(req, res, next) {
  const role = req.user.role;
  const userId = req.params.userId;

  // Parent can modify any user's watchlist
  if (role === "parent") {
    return next();
  }

  // Child can modify only their own watchlist
  if (role === "child" && String(req.user.id) === String(userId)) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied",
  });
}

