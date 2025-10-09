import jwt from "jsonwebtoken";

// middleware function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
  try {
    const {token} = req.headers

    if (!token){
      return res.json({success:false, message: 'Not Authorized Login Again'})
    } 

    const token_decode = jwt.decode(token)
    req.body.clerkId = token_decode.clerkId
    next()
    
  } catch (error) {
    console.log("Error in auth.js in middleware folder");
    res.json({ success: false, message: error.message})
  }
};

export default authUser;