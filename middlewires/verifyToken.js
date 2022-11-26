const jwt = require("jsonwebtoken");

//MIDDLE WIRE TO VERIFY TOKEN VALIDITY
const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(req.headers);
  if (authHeader) {
    let token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json({ msg: "Token invalid", error: err });
      else {
        // console.log(user);
        req.user = user?.userInfo;
        next();
      }
    });
  } else {
    return res.status(401).json("authentication header not found :\\");
  }
};

//MIDDLE WIRE INSIDE MIDDLEWIRE || Authorization
const verifyTokenAndAdmin = (req, res, next) => {
  // console.log(req || "not found");
  verifyToken(req, res, () => {
    if (req.user.role === "admin") next();
    else res.status(403).json("Opps...! you don't have access");
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.email);
    // console.log(req.query.email);

    if (
      req?.user?._id === req?.query?.userId ||
      req?.user?._id === req?.query?._id ||
      req?.user?.email === req?.query?.email ||
      req?.user?.role === "admin"
    ) {
      // console.log("executed");
      next();
    } else res.status(403).json("Opps...! you don't have access");
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
