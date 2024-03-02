import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import SubAdmin from "../models/subAdmin.js";
import Manager from "../models/managerModel.js";
import Admin from "../models/adminModel.js"

const userProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      req.user = await SubAdmin.findById(decoded.id).select('-password')
      req.user = await Manager.findById(decoded.id).select('-password')
      req.user = await Admin.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({
        message: "you are not authorized"
      })
    }
  }
  if (!token) {
    res.status(401).json({
      message: "Please login with your account"
    })
  }

}

export { userProtect };