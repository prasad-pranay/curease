// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.token; // read from cookie
//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET );

//     // find user using decoded id
//     const user = await PatientScheme.findById(decoded.id).select("-details.Password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // attach user data to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };