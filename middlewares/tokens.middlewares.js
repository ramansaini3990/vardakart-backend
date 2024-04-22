const { verifyToken } = require("../tokens/users.tokens");

let userData;
const tokenMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    if (token) {
      const decodedData = verifyToken(token);
      userData = decodedData.userData;
      if (!decodedData) {
        return res.status(401).json({ success: false, error: "token expired" });
      }
      return next();
    }
    res.status(401).json({
      error: "token is not provided",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ success: false, error: error });
  }
};

module.exports = {
  tokenMiddleware,
};
