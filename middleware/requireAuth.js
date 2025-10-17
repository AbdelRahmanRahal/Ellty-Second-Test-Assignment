import jwt from "jsonwebtoken";

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header and attaches the user's ID to the request.
 */
const requireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.author_id = id; // Attach author_id to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;