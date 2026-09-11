
export default function authorizeRole(value) {
  return (req, res, next) => {
    if (req.user.role !== value) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}

