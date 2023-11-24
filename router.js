import { Router } from "express";
import * as fun from "./route_handler.js"
import multer from "multer";
import auth from "./auth.js";

const storage = multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploder = multer({storage:storage})
const router = Router();

router.route("/signup").post(uploder.single("image"),fun.signup);
router.route("/login").post(fun.login);
router.route("/getdata/:userid").get(auth,fun.get_data)
router.route("/get_img/:file").get(fun.get_img)

export default router;