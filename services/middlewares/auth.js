const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Erişim reddedildi. Oturum açınız." });
  }

  try {
    const decodedToken = jwt.verify(token, "gizliAnahtar");
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Geçersiz token." });
  }
};

module.exports = authMiddleware;
