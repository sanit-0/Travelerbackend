import jwt from 'jsonwebtoken'
const auth =async (req,res,next)=>{
    try{

        if(req.headers.authorization){
            let token = req.headers.authorization;

            let decodeToken = jwt.verify(token,process.env.TOKEN_SECRET_KEY);

            if(decodeToken){
                next()
            }
            else{
                return res.status(401).json({
                    message: "Invalid token",
                  });
            }
        }
        else {
            return res.status(401).json({
              message: "Invalid token",
            });
          }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
        
    }
}

export default auth