import mongoose from "mongoose";

const schema = mongoose.Schema({
    profile:{type:String},
    username:{type:String},
    password:{type:String},
    email:{type:String},
    phone:{type:Number},
    image:{type:Object},
})

export default mongoose.model.datas || mongoose.model("data",schema)