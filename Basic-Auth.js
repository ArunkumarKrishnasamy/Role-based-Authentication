const jwt = require("jsonwebtoken")


const authenticate = (req,res,next)=>{ 
    if (req.headers.authorization) {
        let decode = jwt.verify(req.headers.authorization, "secretkey");
        if (decode) {
          next();
        } else {
          res.status(401).json({ message: "Invalid token" });
        }
      } else {
        res.status(404).json({ message: "User is Unauthorized" });
      }
    }

    const authRole =(role)=>{
        return (req, res, next)=>{        
       if(req.user.role !==role){
        res.status(401).send("Not Allowed")
     }
next()
        }
    }

    module.exports={authenticate, authRole};