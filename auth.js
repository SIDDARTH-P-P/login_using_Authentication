import jwt from "jsonwebtoken"

let {verify} = jwt;

export default async function auth(req,res,next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        let user = await verify(token,process.env.SCRET_KEY )
        if(user){
            req.user = user;
            next()
        }
    } catch (error) {
        console.log(error);
        res.json("Unauthorization access")
    }
}