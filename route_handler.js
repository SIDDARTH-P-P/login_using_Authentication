import schema from "./schema/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import path from "path"

const {sign} = jwt;

export async function signup(req,res){
    try {
        let {username,profile,password,email,phone,} = req.body
        let image = req.file
        let user = await schema.findOne({username})
        if(user){
            return res.json("User already exist Use other user name ! ")
        }
        let hashed = await bcrypt.hash(password,10)
        let insert = await schema.create({
            profile,
            username,
            password:hashed,
            email,
            phone,
            image,
        })
        if(insert){
            return res.json("Successfully signup")
            console.log("Successfully signup");
        }
        res.json("Error signup")
    } catch (error) {
        console.log(error);
    }
}

export async function login(req,res){
    try {
        let {password,username} = req.body;
        let user = await schema.findOne({username})
        if(!user){
            return res.status(404).json("user not found !")
        }
        let compair = await bcrypt.compare(password,user.password)
        if(compair){
            let token = await sign({username:user.username,id:user._id},process.env.SCRET_KEY,{expiresIn:"24h"})
          return  res.json({msg:"Successfully login",userid:user._id,token})
        }
        res.status(401).json("Invalid username or password")
    } catch (error) {
        console.log(error);
    }
}

export async function get_data(req,res){
    try {
        let {userid }= req.params;
        let result = await schema.findOne({_id:userid})
        res.json(result)
    } catch (error) {
        console.log(error);
    }
}

export function get_img(req,res){
    try {
        let {file} = req.params
        return res.sendFile(path.resolve(`./images/${file}`))
    } catch (error) {
        console.log(error);
    }
}

